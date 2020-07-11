/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-07-11 18:12:57
 * @Description: 评论控制器
 */

// const marked = require("marked");
const consola = require("consola");
// const geoip = require("geoip-lite");
const CONFIG = require("../app.config");
const queryIp = require("../utils/queryIp");
const { sendMail } = require("../utils/sendMail");
// const {akismetClient} = require("np-utils/np-akismet");
const Comment = require("../models/Comment");
const Article = require("../models/Article");
const Option = require("../models/Option");

const authIsVerified = require("../middleware/auth");
const {
  arrayUniq,
  numberIsInvalid,
  arrayIsInvalid,
  objectValues,
} = require("../utils/tools");
const {
  COMMENT_STATE,
  COMMENT_POST_TYPE,
  SORT_TYPE,
} = require("../core/constants");
const {
  handleError,
  handleSuccess,
  humanizedHandleError,
  humanizedHandleSuccess,
  handlePaginateData,
  buildController,
  initController,
} = require("../core/processor");

// controller
const CommentCtrl = initController(["list", "item"]);

// 为评论内容创建一个编译器实例
// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: true,
//   smartLists: true,
//   smartypants: false
// });

// 更新当前所受影响的文章的评论聚合数据
const updateArticleCommentCount = (article_ids = []) => {
  console.log(article_ids);
  article_ids = arrayUniq(article_ids).filter((id) => !!id);
  if (arrayIsInvalid(article_ids)) {
    return false;
  }
  Comment.aggregate([
    {
      $match: {
        status: COMMENT_STATE.published,
        article_id: { $in: article_ids },
      },
    },
    { $group: { _id: "$article_id", num_tutorial: { $sum: 1 } } },
  ])
    .then((counts) => {
      if (arrayIsInvalid(counts)) {
        Article.updateOne({ id: article_ids[0] }, { $set: { comments: 0 } })
          .then((info) => {
            // consola.info("评论聚合更新成功", info)
          })
          .catch((err) => {
            // consola.warn("评论聚合更新失败", err)
          });
      } else {
        counts.forEach((count) => {
          Article.updateOne(
            { id: count._id },
            { $set: { comments: count.num_tutorial } }
          )
            .then((info) => {
              consola.info("评论聚合更新成功", info);
            })
            .catch((err) => {
              consola.warn("评论聚合更新失败", err);
            });
        });
      }
    })
    .catch((err) => {
      consola.warn("更新评论count聚合数据前，查询失败", err);
    });
};

// 邮件通知网站主及目标对象
const sendMailToAdminAndTargetUser = (comment, permalink) => {
  // const commentContent = marked(comment.content);
  const commentType =
    comment.article_id === COMMENT_POST_TYPE.guestbook ? "评论" : "留言";
  const replyText = (isReply) => (isReply ? "回复" : "");
  const sendMailText = (isReply) =>
    `来自 ${comment.author.name} 的${commentType}${replyText(isReply)}：${
      comment.content
    }`;
  const sendMailHtml = (isReply) =>
    `<p> 来自 ${comment.author.name} 的${commentType}${replyText(isReply)}：${
      comment.content
    }</p><br><a href="${permalink}" target="_blank">[ 点击查看 ]</a>`;
  // const sendMailHtml = isReply => `<p> 来自 ${comment.author.name} 的${commentType}${replyText(isReply)}：${commentContent}</p><br><a href="${permalink}" target="_blank">[ 点击查看 ]</a>`;
  sendMail({
    to: CONFIG.EMAIL.user,
    subject: `博客有新的${commentType}`,
    text: sendMailText(false),
    html: sendMailHtml(false),
  });
  // if (comment.parent) {
  //   Comment.findOne({ id: comment.parent }).then(parentComment => {
  //     sendMail({
  //       to: parentComment.author.email,
  //       subject: `你在 ${CONFIG.APP.NAME} 有新的${commentType}回复`,
  //       text: sendMailText(true),
  //       html: sendMailHtml(true)
  //     })
  //   })
  // }
};

// 根据操作状态处理评论转移
const handleCommentsStateChange = (state, comments, referrer) => {
  Option.findOne()
    .then((options) => {
      // 预期行为
      const is_spam = state === COMMENT_STATE.spam;
      const actionName = is_spam ? "submitSpam" : "submitHam";
      const { keywords, mails, ips } = options.blacklist;

      // 如果是将评论状态标记为垃圾邮件，则加入黑名单，以及 submitSpam
      if (is_spam) {
        // consola.log("把这些评论拉到黑名单")
        options.blacklist.ips = arrayUniq(
          ips,
          comments.map((comment) => comment.ip)
        );
        options.blacklist.mails = arrayUniq(
          mails,
          comments.map((comment) => comment.author.email)
        );
        options.blacklist.keywords = arrayUniq(
          keywords,
          comments.map((comment) => comment.content)
        );

        // 如果是将评论状态标记为误标邮件，则移出黑名单，以及 submitHam
      } else {
        // consola.log("把这些评论移出黑名单")
        options.blacklist.mails = options.blacklist.mails.filter((mail) => {
          return !comments.some((comment) => comment.author.email === mail);
        });
        options.blacklist.keywords = options.blacklist.keywords.filter(
          (keyword) => {
            return !comments.some((comment) => comment.content === keyword);
          }
        );
        options.blacklist.ips = options.blacklist.ips.filter(
          (ip) => !comments.some((comment) => comment.ip === ip)
        );
      }

      // 批量操作
      comments.forEach((comment) => {
        akismetClient[actionName]({
          user_ip: comment.ip,
          user_agent: comment.agent,
          referrer: referrer,
          comment_type: "comment",
          comment_author: comment.author.name,
          comment_author_email: comment.author.email,
          comment_author_url: comment.author.site,
          comment_content: comment.author.content,
          is_test: CONFIG.isDevMode,
        });
      });

      // 更新黑名单
      options
        .save()
        .then((options) => {
          // consola.info("黑名单什么的已经更新成功", options.blacklist)
        })
        .catch((err) => {
          consola.warn("评论状态转译后，黑名单更新失败", err);
        });
    })
    .catch((err) => {
      consola.warn(`处理评论状态转移之前，获取系统黑名单失败！`, err);
    });
};

// 获取评论列表
CommentCtrl.list.GET = (req, res) => {
  // 初始参数
  const { keyword, article_id } = req.query;
  const [status, page, per_page, sort, is_top] = [
    req.query.status,
    req.query.page || 1,
    req.query.per_page || 10,
    req.query.sort || SORT_TYPE.desc,
    req.query.is_top || 0,
  ].map((k) => Number(k));
  // 过滤条件
  const options = {
    page,
    limit: per_page,
    sort: { _id: sort },
  };

  // 排序字段
  if ([SORT_TYPE.asc, SORT_TYPE.desc].includes(sort)) {
    options.sort = { _id: sort };
  }

  // 查询参数
  const query = {};

  // 查询各种状态
  if (objectValues(COMMENT_STATE).includes(status)) {
    query.status = status;
  }

  if (objectValues(SORT_TYPE).includes(is_top)) {
    query.is_top = true;
  }

  // 如果是前台请求，则重置公开状态和发布状态
  if (!authIsVerified(req)) {
    query.status = 1;
  }

  // 通过 post-id 过滤
  if (article_id !== undefined) {
    query.article_id = article_id;
  }

  // 关键词查询
  if (keyword) {
    const keywordReg = new RegExp(keyword);
    query.$or = [
      { content: keywordReg },
      { "author.name": keywordReg },
      { "author.email": keywordReg },
    ];
  }

  // 请求评论
  Comment.paginate(query, options)
    .then((comments) => {
      handleSuccess({
        res,
        message: "评论列表获取成功",
        result: handlePaginateData(comments),
      });
    })
    .catch(humanizedHandleError(res, "评论列表获取失败"));
};

// 发布评论
CommentCtrl.list.POST = (req, res) => {
  const comment = req.body;
  // 获取 ip 地址以及物理地址
  let ip_location = null;
  const ip = (
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress ||
    req.ip ||
    req.ips[0]
  ).replace("::ffff:", "");
  const doSaveComment = () => {
    // 基础数据
    comment.ip = ip;
    comment.likes = 0;
    comment.is_top = false;
    comment.agent = req.headers["user-agent"] || comment.agent;
    if (ip_location) {
      comment.ip_location = {
        city: ip_location.city,
        province: ip_location.province,
        country: ip_location.country,
        isp: ip_location.isp,
      };
    }

    // 永久链接
    const pageLink =
      comment.article_id === COMMENT_POST_TYPE.guestbook
        ? "guestbook"
        : `article/${comment.article_id}`;
    const permalink = CONFIG.APP.URL + "/" + pageLink;
    // 发布评论
    const saveComment = () => {
      new Comment(comment)
        .save()
        .then((result = comment) => {
          handleSuccess({ res, result, message: "评论发布成功" });

          // 发布成功后，向网站主及被回复者发送邮件提醒，并更新网站聚合
          sendMailToAdminAndTargetUser(comment, permalink);
          updateArticleCommentCount([comment.article_id]);
        })
        .catch(humanizedHandleError(res, "评论发布失败"));
    };
    saveComment();
    // 使用 akismet 过滤
    // akismetClient.checkSpam({
    //   permalink,
    //   user_ip: comment.ip,
    //   user_agent: comment.agent,
    //   referrer: req.headers.referer,
    //   comment_type: "comment",
    //   comment_author: comment.author.name,
    //   comment_author_email: comment.author.email,
    //   comment_author_url: comment.author.site,
    //   comment_content: comment.content,
    //   is_test: environment.isDevMode
    // })
    //   .then(info => Option.findOne())
    //   .then(options => {

    //     // 使用设置的黑名单 ip/邮箱/关键词过滤
    //     const { keywords, mails, ips } = options.blacklist;
    //     const blockIp = ips.includes(comment.ip);
    //     const blockEmail = mails.includes(comment.author.email);
    //     const blockKeyword = keywords.length && eval(`/${keywords.join("|")}/ig`).test(comment.content);
    //     const isBlocked = blockIp || blockEmail || blockKeyword;
    //     isBlocked
    //       ? handleError({ res, err: "内容||ip||邮箱 => 不合法", message: "评论发布失败" })
    //       : saveComment()
    //   })
    //   .catch(humanizedHandleError(res, "评论发布失败"))
  };
  queryIp(ip)
    .then(({ body: { resultcode, result } }) => {
      if (resultcode == 200) {
        ip_location = {
          city: result.City,
          country: result.Country,
          province: result.Province,
          isp: result.Isp,
        };
        doSaveComment();
      }
    })
    .catch((err) => {
      consola.info("聚合查询网站查询IP发生错误~", ip, err);
      // ip_location = geoip.lookup(ip);
      // doSaveComment()
    });
};

// 批量修改（移回收站、回收站恢复）
CommentCtrl.list.PATCH = (
  { body: { comments, post_ids, state }, headers: { referer } },
  res
) => {
  // 验证 comments 有效性
  const stateIsInvalid =
    numberIsInvalid(state) ||
    !objectValues(COMMENT_STATE).includes(Number(state));

  if (arrayIsInvalid(comments) || stateIsInvalid) {
    return handleError({ res, message: "缺少有效参数或参数无效" });
  } else {
    state = Number(state);
  }

  Comment.updateMany(
    { _id: { $in: comments } },
    { $set: { state } },
    { multi: true }
  )
    .then((result) => {
      handleSuccess({ res, result, message: "评论批量操作成功" });

      // 如果处理的评论有超过包含一篇文章评论以上的状态，则更新所相关文章的聚合数据
      if (!arrayIsInvalid(post_ids)) {
        updateArticleCommentCount(post_ids);
      }

      // 处理评论状态转移，如果是将评论状态标记为垃圾邮件，则同时加入黑名单，以及 submitSpam
      Comment.find({ _id: { $in: comments } })
        .then((todo_comments) => {
          handleCommentsStateChange(state, todo_comments, referer);
        })
        .catch((err) => {
          consola.warn(`批量转译评论数据状态至 ${state} 时，出现错误！`, err);
        });
    })
    .catch(humanizedHandleError(res, "评论批量操作失败"));
};

// 批量删除评论
CommentCtrl.list.DELETE = ({ body: { comments, post_ids } }, res) => {
  // 验证
  if (arrayIsInvalid(comments)) {
    return handleError({ res, message: "缺少有效参数" });
  }

  Comment.deleteMany({ _id: { $in: comments } })
    .then((result) => {
      handleSuccess({ res, result, message: "评论批量删除成功" });

      // 如果处理的评论有超过包含一篇文章评论以上的状态，则更新所相关文章的聚合数据
      if (!arrayIsInvalid(post_ids)) {
        updateArticleCommentCount(post_ids);
      }
    })
    .catch(humanizedHandleError(res, "评论批量删除失败"));
};

// 获取单个评论
CommentCtrl.item.GET = ({ params: { comment_id } }, res) => {
  Comment.findById(comment_id)
    .then(humanizedHandleSuccess(res, "评论获取成功"))
    .catch(humanizedHandleError(res, "评论获取失败"));
};

// 修改单个评论
CommentCtrl.item.PATCH = (
  { params: { comment_id }, body: comment, headers: { referer } },
  res
) => {
  Comment.findByIdAndUpdate(comment_id, comment, { new: true })
    .then((result) => {
      handleSuccess({ res, result, message: "评论修改成功" });

      // 如果评论所属为文章评论，则更新文章所属的聚合数据
      if (comment.post_id) {
        updateArticleCommentCount([comment.post_id]);
      }

      // 处理评论状态转移
      handleCommentsStateChange(comment.state, [comment], referer);
    })
    .catch(humanizedHandleError(res, "评论修改失败"));
};

// 删除单个评论
CommentCtrl.item.DELETE = ({ params: { comment_id } }, res) => {
  Comment.findByIdAndRemove(comment_id)
    .then(humanizedHandleSuccess(res, "评论删除成功"))
    .catch(humanizedHandleError(res, "评论删除失败"));
};

exports.list = buildController(CommentCtrl.list);
exports.item = buildController(CommentCtrl.item);

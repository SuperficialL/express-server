/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-08-16 19:22:32
 * @Description: 文章控制器
 */

const Article = require("../models/Article");
const Tag = require("../models/Tag");
const Category = require("../models/Category");
const authIsVerified = require("../middleware/auth");
const {
  numberIsInvalid,
  arrayIsInvalid,
  objectValues,
} = require("../utils/tools");
const {
  PUBLISH_STATE,
  PUBLIC_STATE,
  ORIGIN_STATE,
  SORT_TYPE,
  REDIS_CACHE_FIELDS,
} = require("../core/constants");
const {
  handleError,
  handleSuccess,
  humanizedHandleError,
  handlePaginateData,
  buildController,
  initController,
} = require("../core/processor");
const {
  baiduSeoPush,
  baiduSeoUpdate,
  baiduSeoDelete,
} = require("../utils/baidu-seo-push");
const CONFIG = require("../app.config");

const ArticleCtrl = initController(["list", "item"]);

// 获取文章列表
ArticleCtrl.list.GET = (req, res) => {
  // 初始化查询条件
  const { keyword, category, category_slug, tag, tag_slug, date } = req.query;
  const [page, per_page, status, publicStatus, origin, hot] = [
    req.query.page || 1,
    req.query.per_page,
    req.query.state,
    req.query.public,
    req.query.origin,
    req.query.hot,
  ].map((k) => Number(k));
  // 过滤条件
  const options = {
    page,
    populate: ["category", "tags"],
    select: "-password -content",
    sort: { _id: SORT_TYPE.desc },
  };
  if (!numberIsInvalid(per_page)) {
    options.limit = per_page;
  }

  // 查询参数
  const query = {};

  // 标签 id 查询
  if (tag) {
    query.tag = tag;
  }

  // 分类 id 查询
  if (category) {
    query.category = category;
  }

  // 热评查询
  if (hot) {
    options.sort = {
      comments: SORT_TYPE.desc,
      likes: SORT_TYPE.desc,
    };
  }

  // 关键词查询
  if (keyword) {
    const keywordReg = new RegExp(keyword);
    query.$or = [
      { title: keywordReg },
      { content: keywordReg },
      { description: keywordReg },
    ];
  }

  // 时间查询
  if (date) {
    const getDate = new Date(date);
    if (getDate.toString() !== "Invalid Date") {
      query.create_at = {
        $gte: new Date((getDate / 1000 - 60 * 60 * 8) * 1000),
        $lt: new Date((getDate / 1000 + 60 * 60 * 16) * 1000),
      };
    }
  }

  // 按照发布状态查询
  if (objectValues(PUBLISH_STATE).includes(status)) {
    query.status = status;
  }

  // 按照公开状态查询
  if (objectValues(PUBLIC_STATE).includes(publicStatus)) {
    query.public = publicStatus;
  }

  // 文章来源性质查询
  if (objectValues(ORIGIN_STATE).includes(origin)) {
    query.origin = origin;
  }

  // 如果是前台请求，则重置公开状态和发布状态
  if (!authIsVerified(req)) {
    query.status = PUBLISH_STATE.published;
    // query.public = PUBLIC_STATE.public
  }

  // 请求对应文章
  const getArticles = () => {
    Article.paginate(query, options)
      .then((articles) => {
        handleSuccess({
          res,
          message: "文章列表获取成功",
          result: handlePaginateData(articles),
        });
      })
      .catch(humanizedHandleError(res, "文章列表获取失败"));
  };

  // 分类别名查询 - 根据别名查询到 id，然后根据 id 查询
  if (category_slug) {
    return Category.find({ slug: category_slug })
      .then(([category] = []) => {
        if (category) {
          query.category = category._id;
          getArticles();
        } else {
          handleError({ res, message: "分类不存在" });
        }
      })
      .catch(humanizedHandleError(res, "分类查找失败"));
  }

  // 标签别名查询 - 根据别名查询到 id，然后根据 id 查询
  if (tag_slug) {
    return Tag.find({ slug: tag_slug })
      .then(([tag] = []) => {
        if (tag) {
          query.tags = tag._id;
          getArticles();
        } else {
          handleError({ res, message: "标签不存在" });
        }
      })
      .catch(humanizedHandleError(res, "标签查找失败"));
  }

  // 默认请求文章列表
  getArticles();
};

// 新增文章
ArticleCtrl.list.POST = ({ body: article }, res) => {
  // 验证
  if (!article.title || !article.content) {
    return handleError({ res, message: "内容不合法" });
  }

  // 保存文章
  new Article(article)
    .save()
    .then((result = article) => {
      handleSuccess({ res, result, message: "文章发布成功" });
      // TagCtrl.redisTagsCache.update();
      baiduSeoPush(`${CONFIG.APP.URL}/article/${result.id}`);
    })
    .catch(humanizedHandleError(res, "文章发布失败"));
};

// 批量修改(物理删除)
ArticleCtrl.list.PATCH = ({ body: { articles, action } }, res) => {
  // 验证
  if (arrayIsInvalid(articles)) {
    return handleError({ res, message: "缺少有效参数" });
  }

  // 要改的数据
  const actions = {
    1: PUBLISH_STATE.recycle,
    2: PUBLISH_STATE.draft,
    3: PUBLISH_STATE.published,
  };

  const doAction = actions[action];
  const updatePart = objectValues(actions).includes(doAction)
    ? { state: doAction }
    : {};

  Article.updateMany(
    { _id: { $in: articles } },
    { $set: updatePart },
    { multi: true }
  )
    .then((result) => {
      handleSuccess({ res, result, message: "文章批量操作成功" });
      // TagCtrl.redisTagsCache.update();
    })
    .catch(humanizedHandleError(res, "文章批量操作失败"));
};

// 批量删除
ArticleCtrl.list.DELETE = ({ body: { articles } }, res) => {
  // 验证
  if (arrayIsInvalid(articles)) {
    return handleError({ res, message: "缺少有效参数" });
  }

  // delete action
  const deleteArticls = () => {
    Article.deleteMany({ _id: { $in: articles } })
      .then((result) => {
        handleSuccess({ res, result, message: "文章批量删除成功" });
      })
      .catch(humanizedHandleError(res, "文章批量删除失败"));
  };

  // baidu-seo-delete
  Article.find({ _id: { $in: articles } }, "id")
    .then((articles) => {
      if (articles && articles.length) {
        const urls = articles.map(article => `${CONFIG.APP.URL}/article/${article.id}`).join("\n")
        baiduSeoDelete(urls)
      }
      deleteArticls();
    })
    .catch(deleteArticls);
};

// 获取单个文章
ArticleCtrl.item.GET = ({ params: { article_id } }, res) => {
  // 判断来源
  const isFindById = isNaN(Number(article_id));
  // 获取相关文章
  const getRelatedArticles = (result) => {
    Article.find(
      {
        status: PUBLISH_STATE.published,
        tags: { $in: result.tags.map((t) => t._id) },
      },
      "id title description thumbnail -_id",
      (err, articles) => {
        result.related = err ? [] : articles;
        handleSuccess({ res, result, message: "文章获取成功" });
      }
    );
  };

  (isFindById
    ? Article.findById(article_id)
    : Article.findOne({ id: article_id, status: PUBLISH_STATE.published })
        .populate("category tags")
        .exec()
  )
    .then((result) => {
      // 每请求一次，浏览次数都要增加
      if (!isFindById) {
        result.views++;
        result.save();
        // redis.get(REDIS_CACHE_FIELDS.todayViews).then(views => {
        //   redis.set(REDIS_CACHE_FIELDS.todayViews, (views || 0) + 1)
        // })
      }

      // 如果是前台用户请求，则需要获取相关文章
      if (!isFindById && result.tags.length) {
        getRelatedArticles(result.toObject());
      } else {
        handleSuccess({ res, result, message: "文章获取成功" });
      }
    })
    .catch(humanizedHandleError(res, "文章获取失败", 404));
};

// 修改单个文章
ArticleCtrl.item.PATCH = ({ params: { article_id }, body: article }, res) => {
  // 验证
  if (!article.title || !article.content) {
    return handleError({ res, message: "内容不合法" });
  }

  // 修正信息
  // Reflect.deleteProperty(article, "meta")
  // Reflect.deleteProperty(article, "create_at")
  // Reflect.deleteProperty(article, "update_at")

  // 修改文章
  Article.findByIdAndUpdate(article_id, article, { new: true })
    .then((result) => {
      handleSuccess({ res, result, message: "文章修改成功" });
      // TagCtrl.redisTagsCache.update()
      baiduSeoUpdate(`${CONFIG.APP.URL}/article/${result.id}`);
    })
    .catch(humanizedHandleError(res, "文章修改失败"));
};

// 删除单个文章
ArticleCtrl.item.DELETE = ({ params: { article_id } }, res) => {
  Article.findByIdAndRemove(article_id)
    .then((result) => {
      handleSuccess({ res, result, message: "文章删除成功" });
      // TagCtrl.redisTagsCache.update()
      baiduSeoDelete(`${CONFIG.APP.URL}/article/${result.id}`)
    })
    .catch(humanizedHandleError(res, "文章删除失败"));
};

exports.list = buildController(ArticleCtrl.list);
exports.item = buildController(ArticleCtrl.item);

/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-07-11 17:59:41
 * @Description:  友链控制器
 */

const Link = require("../models/Link");
const {
  arrayIsInvalid,
  objectValues,
  numberIsInvalid,
} = require("../utils/validate");
const {
  PUBLISH_STATE,
  PUBLIC_STATE,
  ORIGIN_STATE,
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
const LinkCtrl = initController(["list", "item"]);

// 获取标签列表
LinkCtrl.list.GET = (req, res) => {
  // 初始化查询条件
  const [page, per_page, status, publicStatus, origin, hot, is_top] = [
    req.query.page || 1,
    req.query.per_page,
  ].map((k) => Number(k));

  // 过滤条件
  const options = {
    page,
    sort: { _id: SORT_TYPE.desc },
  };
  if (!numberIsInvalid(per_page)) {
    options.limit = per_page;
  }

  // 查询参数
  const query = {};

  // 关键字查询
  if (is_top) {
    query.is_top = 1;
  }

  // 请求评论
  Link.paginate(query, options)
    .then((links) => {
      handleSuccess({
        res,
        message: "友链列表获取成功",
        result: handlePaginateData(links),
      });
    })
    .catch(humanizedHandleError(res, "友链列表获取失败"));
};

// // 发布标签
// LinkCtrl.list.POST = ({ body: tag, body: { slug } }, res) => {
//   // 验证
//   if (slug === undefined || slug === null) {
//     return handleError({ res, message: "缺少slug" });
//   }

//   // 保存标签
//   const saveLink = () => {
//     new Link(link)
//       .save()
//       .then((result = link) => {
//         handleSuccess({ res, result, message: "标签发布成功" });
//         // redisTagsCache.update();
//         // updateAndBuildSiteMap();
//         // baiduSeoPush(`${CONFIG.APP.URL}/tag/${result.slug}`)
//       })
//       .catch(humanizedHandleError(res, "标签发布失败"));
//   };

//   // 验证Slug合法性
//   Link.find({ slug })
//     .then(({ length }) => {
//       length ? handleError({ res, message: "slug已被占用" }) : saveTag();
//     })
//     .catch(humanizedHandleError(res, "标签发布失败"));
// };

// // 批量删除标签
// LinkCtrl.list.DELETE = ({ body: { tags } }, res) => {
//   // 验证
//   if (arrayIsInvalid(tags)) {
//     return handleError({ res, message: "缺少有效参数" });
//   }

//   Link.deleteMany({ _id: { $in: tags } })
//     .then((result) => {
//       handleSuccess({ res, result, message: "标签批量删除成功" });
//       // redisTagsCache.update();
//       // updateAndBuildSiteMap()
//     })
//     .catch(humanizedHandleError(res, "标签批量删除失败"));
// };

// // 修改单个标签
// LinkCtrl.item.PATCH = ({ params: { tag_id }, body: tag }, res) => {
//   const { slug } = tag;
//   if (!slug) {
//     return handleError({ res, message: "slug不合法" });
//   }

//   // 修改
//   const putTag = () => {
//     Tag.findByIdAndUpdate(tag_id, tag, { new: true })
//       .then((result) => {
//         handleSuccess({ res, result, message: "标签修改成功" });
//         // redisTagsCache.update();
//         // updateAndBuildSiteMap();
//         // baiduSeoUpdate(`${CONFIG.APP.URL}/tag/${result.slug}`)
//       })
//       .catch(humanizedHandleError(res, "标签修改失败"));
//   };

//   // 修改前判断 slug 的唯一性，是否被占用
//   Tag.find({ slug })
//     .then(([existed_tag]) => {
//       const hasExisted = existed_tag && String(existed_tag._id) !== tag_id;
//       hasExisted ? handleError({ res, message: "slug已存在" }) : putTag();
//     })
//     .catch(humanizedHandleError(res, "修改前查询失败"));
// };

// // 删除单个标签
// LinkCtrl.item.DELETE = ({ params: { tag_id } }, res) => {
//   Tag.findByIdAndRemove(tag_id)
//     .then((result) => {
//       handleSuccess({ res, result, message: "标签删除成功" });
//       // redisTagsCache.update();
//       // updateAndBuildSiteMap()
//     })
//     .catch(humanizedHandleError(res, "标签删除失败"));
// };

exports.list = buildController(LinkCtrl.list);
exports.item = buildController(LinkCtrl.item);
// exports.redisTagsCache = redisTagsCache;

/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-09-07 17:57:26
 * @Description: 公告栏控制器
 */

const authIsVerified = require("../middleware/auth");

const Notice = require("../models/Notice");
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
  humanizedHandleSuccess,
  humanizedHandleError,
  handlePaginateData,
  buildController,
  initController,
} = require("../core/processor");

// controller
const NoticeCtrl = initController(["list", "item"]);

// 获取公告列表
NoticeCtrl.list.GET = (req, res) => {
  // 初始参数
  const keyword = req.query.keyword;
  const [page, per_page, status] = [
    req.query.page || 1,
    req.query.per_page,
    req.query.status,
  ].map((k) => Number(k));

  // 过滤条件
  const options = {
    page,
    sort: { _id: SORT_TYPE.desc },
  };

  if (!isNaN(per_page)) {
    options.limit = per_page;
  }

  // 查询参数
  const query = {};

  // 关键词查询
  if (keyword) {
    query.content = new RegExp(keyword);
  }

  // 按照 type 查询
  if ([PUBLISH_STATE.draft, PUBLISH_STATE.published].includes(status)) {
    query.status = status;
  }

  // 如果是前台请求，则重置公开状态和发布状态
  if (!authIsVerified(req)) {
    query.status = PUBLISH_STATE.published;
  }

  // 请求
  Notice.paginate(query, options)
    .then((notices) => {
      handleSuccess({
        res,
        message: "公告列表获取成功",
        result: handlePaginateData(notices),
      });
    })
    .catch(humanizedHandleError(res, "公告列表获取失败"));
};

// 发布公告
NoticeCtrl.list.POST = ({ body: notice }, res) => {
  new Notice(notice)
    .save()
    .then(humanizedHandleSuccess(res, "公告发布成功"))
    .catch(humanizedHandleError(res, "公告发布失败"));
};

// 批量删除公告
NoticeCtrl.list.DELETE = ({ body: { notices } }, res) => {
  // 验证
  if (arrayIsInvalid(notices)) {
    return handleError({ res, message: "缺少有效参数" });
  }

  // 删除
  Notice.deleteMany({ _id: { $in: notices } })
    .then(humanizedHandleSuccess(res, "公告批量删除成功"))
    .catch(humanizedHandleError(res, "公告批量删除失败"));
};

// 修改单个公告
NoticeCtrl.item.PATCH = ({ params: { notice_id }, body: notice }, res) => {
  if (!notice.content) {
    return handleError({ res, message: "内容不合法" });
  }

  Notice.findByIdAndUpdate(notice_id, notice, { new: true })
    .then(humanizedHandleSuccess(res, "公告修改成功"))
    .catch(humanizedHandleError(res, "公告修改失败"));
};

// 删除单个公告
NoticeCtrl.item.DELETE = ({ params: { notice_id } }, res) => {
  Notice.findByIdAndRemove(notice_id)
    .then(humanizedHandleSuccess(res, "公告删除成功"))
    .catch(humanizedHandleError(res, "公告删除失败"));
};

exports.list = buildController(NoticeCtrl.list);
exports.item = buildController(NoticeCtrl.item);

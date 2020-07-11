/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-07-10 14:49:49
 * @Description: 点赞控制器
 */

const { warn, success } = require("consola");
const Option = require("../models/Option");
const Article = require("../models/Article");
const Comment = require("../models/Comment");
const { objectValues } = require("../utils/validate");
const { LIKE_TYPE, COMMENT_POST_TYPE } = require("../core/constants");
const {
  handleError,
  handleSuccess,
  humanizedHandleError,
} = require("../core/processor");

module.exports = ({ body: { id, type } }, res) => {
  console.log(id, type);
  // 验证参数的正确性，1 => 评论，2 => 页面
  if (!objectValues(LIKE_TYPE).includes(type)) {
    return handleError({ res, message: "喜欢失败，没有原因" });
  }
  // like
  const ModelService = type === LIKE_TYPE.comment ? Comment : Article;
  ModelService.findOne({ id })
    .then((result) => {
      result.likes++;
      result
        .save()
        .then((info) => {
          success("点赞更新成功", info);
        })
        .catch((err) => {
          warn("点赞更新失败", err);
        });
      handleSuccess({ res, message: "爱你么么扎" });
    })
    .catch(humanizedHandleError(res, "喜欢失败"));
};

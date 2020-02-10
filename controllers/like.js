/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2020-02-10 14:52:31
 * @Description:  赞控制器
 */

const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Response = require("../utils/helper");

class LikeController {
  // 点赞
  async isLike(ctx) {
    const { id, type } = ctx.query;
    const ModelService = type === "article" ? Article : Comment;
    const res = await ModelService.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    if (res) {
      ctx.body = new Response().success("爱你么么扎");
    } else {
      ctx.body = new Response().error("喜欢失败");
    }
  }
}

module.exports = new LikeController();

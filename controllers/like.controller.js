/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-02-17 10:42:22
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
    ctx.cookies.set(
      `${type}_liked_${id}`,
      true,
      {
        maxAge: 30 * 60 * 1000,
        path: `/detail/${id}`
      }
    );
    if (res) {
      ctx.body = new Response().success("爱你么么扎");
    } else {
      ctx.body = new Response().error("喜欢失败");
    }
  }
}

module.exports = new LikeController();

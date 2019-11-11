/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:32:54
 * @LastEditTime: 2019-11-10 16:00:23
 * @Description: 评论控制器
 */

const Comment = require("../models/Comment");
const Response = require("../utils/helper");

class CommentController {
  async getComments(ctx) {
    const total = await Comment.countDocuments();
    const comments = await Comment.find();
    ctx.body = new Response().json({ comments, total });
  }

  async getComment(ctx) {
    const { id } = ctx.params;
    const comment = await Comment.findById(id);
    ctx.body = comment
      ? new Response().json({ comment })
      : new Response().success("分类不存在~");
  }

  async createComment(ctx) {
    const { username, article_id, email, content } = ctx.request.body;
    await new Comment({ username, article_id, email, content }).save();
    ctx.body = new Response().success();
  }

  async updateComment(ctx) {
    const total = await Comment.countDocuments();
    const comments = await Comment.find();
    ctx.body = new Response().json({ comments, total });
  }

  async delComment(ctx) {
    const total = await Comment.countDocuments();
    const comments = await Comment.find();
    ctx.body = new Response().json({ comments, total });
  }
}

module.exports = new CommentController();

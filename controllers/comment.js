/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:32:54
 * @LastEditTime: 2019-11-15 23:40:43
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
    console.log(id, "id");
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
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    console.log(update);
    const comment = await Comment.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = comment
      ? new Response().success("评论更新成功~")
      : new Response().success("评论不存在~");
  }

  async delComment(ctx) {
    const { id } = ctx.params;
    const comment = await Comment.findByIdAndRemove(id);
    ctx.body = comment
      ? new Response().success("评论删除成功~")
      : new Response().success("评论不存在~");
  }
}

module.exports = new CommentController();

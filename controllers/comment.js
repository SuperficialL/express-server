/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:32:54
 * @LastEditTime : 2019-12-27 00:28:31
 * @Description: 评论控制器
 */
const gravatar = require("gravatar");
const Comment = require("../models/Comment");
const Response = require("../utils/helper");

class CommentController {
  async getComments(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Comment.countDocuments();
    const comments = await Comment.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(Number(per_page));
    ctx.body = new Response().json({ comments, total });
  }

  async getComment(ctx) {
    const { id } = ctx.params;
    const comment = await Comment.findById(id);
    ctx.body = comment
      ? new Response().json({ comment })
      : new Response().success("评论不存在~");
  }

  async createComment(ctx) {
    const { username, article_id, email, content } = ctx.request.body;
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    await new Comment({ username, article_id, email, avatar, content }).save();
    ctx.body = new Response().success("评论创建成功");
  }

  async updateComment(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
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

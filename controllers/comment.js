/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:32:54
 * @LastEditTime: 2019-11-05 22:40:37
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
    const total = await Comment.countDocuments();
    const comments = await Comment.find();
    ctx.body = new Response().json({ comments, total });
  }

  async createComment(ctx) {
    const total = await Comment.countDocuments();
    const comments = await Comment.find();
    ctx.body = new Response().json({ comments, total });
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

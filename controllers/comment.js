/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:32:54
 * @LastEditTime: 2020-03-13 20:21:05
 * @Description: 评论控制器
 */
const gravatar = require("gravatar");
const Comment = require("../models/Comment");
const Article = require("../models/Article");
const User = require("../models/User");
const Response = require("../utils/helper");
const { SendMailToAuthor, SendMailToComment } = require("../utils/sendMail");

// 更新当前所受影响的文章的评论聚合数据
const updateArticleCommentCount = async (article_ids = []) => {
  const articleCounts = await Comment.aggregate([
    { $match: { article_id: { $in: article_ids } } },
    { $group: { _id: "$article_id", total: { $sum: 1 } } }
  ]);
  articleCounts.forEach(async (article) => {
    await Article.findByIdAndUpdate(article._id, { $set: { "comments": article.total } });
  });
};

class CommentController {
  async getComments(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Comment.countDocuments(query);
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
    const { username, article_id, email, content, ua, others } = ctx.request.body;
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    await new Comment({
      username,
      article_id,
      email,
      avatar,
      content,
      ua,
      ...others
    }).save();
    await new User({
      username,
      email,
      avatar
    }).save();
    SendMailToAuthor({ content }, (err) => {
      console.log(err, "err");
    });
    // 更新文章数量
    updateArticleCommentCount([article_id]);
    ctx.body = new Response().success("评论创建成功");
  }

  async updateComment(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const comment = await Comment.findByIdAndUpdate(id, update, {
      new: true
    });
    updateArticleCommentCount([comment.article_id]);
    ctx.body = comment
      ? new Response().success("评论更新成功~")
      : new Response().success("评论不存在~");
  }

  async delComment(ctx) {
    const { id } = ctx.params;
    const comment = await Comment.findByIdAndRemove(id);
    updateArticleCommentCount([comment.article_id]);
    ctx.body = comment
      ? new Response().success("评论删除成功~")
      : new Response().success("评论不存在~");
  }
}

module.exports = new CommentController();

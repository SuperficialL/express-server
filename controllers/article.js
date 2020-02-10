/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2020-02-10 19:59:43
 * @Description: 文章控制器
 */

const Article = require("../models/Article");
const Response = require("../utils/helper");

class ArticleController {
  // 根据查询条件查询文章
  async getArticles(ctx) {
    let { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * Number(per_page);
    const total = await Article.countDocuments(query);
    const articles = await Article.find(query)
      .sort({ _id: -1 })
      .populate("category", "name")
      .populate("author", "username")
      .populate("tags", "title")
      .skip(skip)
      .limit(Number(per_page));

    ctx.body = new Response().json({ articles, total });
  }

  // 查询文章详情
  async getArticle(ctx) {
    const { id } = ctx.params;
    const article = await Article.findOne({ _id: id }).populate([
      { path: "category" },
      { path: "tags" },
      { path: "author" }
    ]);
    // article.views++;
    article.save();
    // const prev_article = await Article.findOne({ _id: { "$lt": id } }).sort({ _id: -1 }).limit(1);
    // const next_article = await Article.findOne({ _id: { "$gt": id } }).sort({ _id: 1 }).limit(1);
    // article.prev = prev_article ? { _id: prev_article._id, title: prev_article.title } : { message: "已是第一条文章" };
    // article.next = next_article ? { _id: next_article._id, title: next_article.title } : { message: "已是最后一条文章" };
    // console.log(article, "articles", typeof article);
    ctx.body = article
      ? new Response().json(article)
      : new Response().error("文章不存在~");
  }

  // 增加文章
  async createArticle(ctx) {
    const {
      title,
      category,
      author,
      tags,
      content,
      renderContent,
      ...others
    } = ctx.request.body;
    await new Article({
      title,
      category,
      author,
      tags,
      content,
      renderContent,
      ...others
    }).save();
    ctx.body = new Response().success("文章创建成功~");
  }

  // 修改文章
  async updateArticle(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const article = await Article.findByIdAndUpdate(id, update, {
      new: true
    }).populate([{ path: "category" }, { path: "tags" }, { path: "author" }]);
    ctx.body = article
      ? new Response().success("文章修改成功~")
      : new Response().error("文章不存在~");
  }

  // 删除文章
  async delArticle(ctx) {
    const { id } = ctx.params;
    const article = await Article.findByIdAndRemove(id);
    ctx.body = article
      ? new Response().success("文章删除成功~")
      : new Response().error("文章不存在~");
  }
}

module.exports = new ArticleController();

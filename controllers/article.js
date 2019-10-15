/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-15 22:44:43
 * @Description: 文章控制器
 */

const Article = require("../models/Article");
const Response = require("../utils/helper");

class ArticleController {
    // 根据查询条件查询文章
    async getArticles(ctx) {
        let { page = 1, per_page = 10 } = ctx.request.query;
        let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
        const total = await Article.countDocuments();
        const articles = await Article.find()
            .populate([
                {
                    path: "category"
                },
                {
                    path: "author"
                },
                {
                    path: "tags"
                }
            ])
            .skip(skip)
            .limit(Number(per_page));
        ctx.body = new Response().json({ articles, total });
    }

    // 查询文章详情
    async getArticle(ctx) {
        const { id } = ctx.params;
        const article = await Article.findById(id).populate([
            { path: "category" },
            { path: "tags" },
            { path: "author" }
        ]);
        ctx.body = article
            ? new Response().json(article)
            : new Response().error("文章不存在~");
    }

    // 增加文章
    async createArticle(ctx) {
        console.log(1);
        const {
            title,
            category,
            author,
            tags,
            content,
            ...others
        } = ctx.request.body;
        console.log(title, category, author, tags, content, others);
        await new Article({
            title,
            category,
            author,
            tags,
            content,
            others
        }).save();
        ctx.body = new Response().success("文章创建成功~");
    }

    // 修改文章
    async updateArticle(ctx) {
        const { id } = ctx.params;
        const { ...update } = ctx.request.body;
        const article = await Article.findByIdAndUpdate(id, update, {
            new: true
        }).populate([
            { path: "category" },
            { path: "tags" },
            { path: "author" }
        ]);
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

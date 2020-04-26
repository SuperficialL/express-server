/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-03-25 17:34:38
 * @Description: 文章控制器
 */

const Article = require("../models/Article");
const Tag = require("../models/Tag");
const Category = require("../models/Category");
const { Response,handlePaginateData,handleSuccess } = require("../utils/helper");
const { authIsVerified } = require("../middleware/auth");
const { numberIsInvalid, arrayIsInvalid, objectValues } = require("../utils/tools")
const { PUBLISH_STATE, PUBLIC_STATE, ORIGIN_STATE, SORT_TYPE, REDIS_CACHE_FIELDS } = require("../core/constants");

class ArticleController {
  async getArticles(ctx) {
    // 初始化查询条件
    const { keyword, category, category_slug, tag, tag_slug, date, hot } = ctx.query;
    const [ page, per_page, state, publicStatus, origin ] = [
      ctx.query.page || 1,
      ctx.query.per_page,
      ctx.query.state,
      ctx.query.public,
      ctx.query.origin
    ].map(k => Number(k));

    // 过滤条件
    const options = {
      page,
      populate: ["category", "tags"],
      select: '-password -content',
      sort: { _id: SORT_TYPE.desc }
    }
    if (!numberIsInvalid(per_page)) {
      options.limit = per_page;
    }

    // 查询参数
	  const query = {}

    // 标签 id 查询
    if (tag) {
      query.tag = tag;
    }

    // 分类 id 查询
    if (category) {
      query.category = category;
    }

    // 热评查询
    if (hot) {
      options.sort = {
        'comments': SORT_TYPE.desc,
        'likes': SORT_TYPE.desc
      }
    }

    // 关键词查询
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      query.$or = [
        { "title": keywordReg },
        { "content": keywordReg },
        { "description": keywordReg }
      ]
    }

    // 时间查询
    if (date) {
      const getDate = new Date(date)
      if (getDate.toString() !== 'Invalid Date') {
        query.create_at = {
          $gte: new Date((getDate / 1000 - 60 * 60 * 8) * 1000),
          $lt: new Date((getDate / 1000 + 60 * 60 * 16) * 1000)
        }
      }
    }

    // 按照发布状态查询
    if (objectValues(PUBLISH_STATE).includes(state)) {
      query.state = state;
    }

    // 按照公开状态查询
    if (objectValues(PUBLIC_STATE).includes(publicStatus)) {
      query.public = publicStatus;
    }

    // 文章来源性质查询
    if (objectValues(ORIGIN_STATE).includes(origin)) {
      query.origin = origin;
    }

    // 如果是前台请求，则重置公开状态和发布状态
    if (!authIsVerified(ctx)) {
      query.status = PUBLISH_STATE.published;
      // query.public = PUBLIC_STATE.public;
    }

    // 分类别名查询 - 根据别名查询到 id，然后根据 id 查询
  	if (category_slug) {
      const { category = [] } = await Category.find({ slug: category_slug });
      if (category)  query.category = category._id;
    }
    
    // // 标签别名查询 - 根据别名查询到 id，然后根据 id 查询
    if (tag_slug) {
      const { tag = [] } = await Tag.find({ slug: tag_slug });
      if (tag) query.tags = tag._id;
    }
    const articles = await Article.paginate(query, options);
    ctx.body = handleSuccess({ 
      result:handlePaginateData(articles),
      message:"文章列表获取成功"
    });
  }

  // 查询文章详情
  async getArticle(ctx) {
    const { article_id } = ctx.params;
    // 判断来源
    const isFindById = isNaN(Number(article_id));
    let article = isFindById
     ? await Article.findById(article_id)
     : await Article.findOne({ id: article_id }).populate("category tags");
    
    if (!isFindById) {
      article.views++;
      article.save();
    }
    article = article.toObject();
    if (!isFindById && article.tags.length) {
      article.related = await Article.find(
        { status: PUBLISH_STATE.published, tags: { $in: article.tags.map(t => t._id) }},
        'id title description thumb -_id'
      );
    }
    ctx.body = handleSuccess({ 
      result:article,
      message:"文章详情获取成功"
    });
  }

  // 增加文章
  async createArticle(ctx) {
    const { article } = ctx.request.body;
    await new Article(article).save();
    ctx.body = handleSuccess({ 
      message:"文章创建成功"
    });
  }

  // 修改文章
  async updateArticle(ctx) {
    const { article_id } = ctx.params;
    const { article } = ctx.request.body;
    console.log(article,'ar');
    const res = await Article.findByIdAndUpdate(article_id, article, { new: true });
    ctx.body = res
      ? new Response().success("文章修改成功~")
      : new Response().error("文章修改失败~");
  }

  // 删除文章
  async delArticle(ctx) {
    const { id } = ctx.params;
    const article = await Article.findByIdAndRemove(id);
    ctx.body = article
      ? new Response().success("文章删除成功~")
      : new Response().error("文章删除成功~");
  }
}

module.exports = new ArticleController();

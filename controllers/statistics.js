/*
 * @Author: Superficial
 * @Date: 2019-11-14 22:33:18
 * @LastEditTime : 2019-12-22 16:31:26
 * @Description: 站点统计
 */
const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Category = require("../models/Category");
const Admin = require("../models/Admin");
const Tag = require("../models/Tag");
const Response = require("../utils/helper");

class Site {
  async getSiteInfo(ctx) {
    const article_total = await Article.countDocuments();
    const comment_total = await Comment.countDocuments();
    const category_total = await Category.countDocuments();
    const user_total = await Admin.countDocuments();
    const tag_total = await Tag.countDocuments();
    ctx.body = new Response().json({
      article_total,
      comment_total,
      user_total,
      tag_total,
      category_total
    });
  }
}

module.exports = new Site();

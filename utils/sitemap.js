/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-09-08 14:24:23
 * @Description: 站点地图
 */
const { createWriteStream } = require("fs");
const path = require("path");
const { SitemapStream } = require("sitemap");
const consola = require("consola");
const CONFIG = require("../app.config");
const Tag = require("../models/Tag");
const Article = require("../models/Article");
const Category = require("../models/Category");
const { PUBLISH_STATE, SORT_TYPE } = require("../core/constants");

const xmlFilePath = path.format({
  dir: path.join(CONFIG.APP.FRONT_END_PATH, "static"),
  name: "sitemap",
  ext: ".xml",
});

// 获取地图
const updateAndBuildSiteMap = () => {
  // sitemap

  smStream = new SitemapStream({ hostname: CONFIG.APP.URL });
  const writeStream = createWriteStream(xmlFilePath);
  smStream.pipe(writeStream);

  // page
  const pages = [
    { url: "", changefreq: "always", priority: 1 },
    { url: "/about", changefreq: "monthly", priority: 1 },
    { url: "/sitemap", changefreq: "always", priority: 1 },
  ];
  pages.forEach((page) => {
    smStream.write(page);
  });

  // tag
  const addTags = Tag.find()
    .sort({ _id: SORT_TYPE.desc })
    .then((tags) => {
      tags.forEach((tag) => {
        smStream.write({
          priority: 0.6,
          changefreq: "daily",
          url: `/tag/${tag.slug}`,
        });
      });
    });

  // category
  const addCategories = Category.find()
    .sort({ _id: SORT_TYPE.desc })
    .then((categories) => {
      categories.forEach((category) => {
        smStream.write({
          priority: 0.6,
          changefreq: "daily",
          url: `/category/${category.slug}`,
        });
      });
    });

  // article
  const addArticles = Article.find({ status: PUBLISH_STATE.published })
    .sort({ _id: SORT_TYPE.desc })
    .then((articles) => {
      articles.forEach((article) => {
        smStream.write({
          priority: 0.8,
          changefreq: "daily",
          url: `/article/${article.id}`,
          lastmodISO: article.createdAt,
        });
      });
    });

  Promise.all([addTags, addCategories, addArticles])
    .then(() => {
      smStream.end();
    })
    .catch((err) => {
      consola.warn("生成地图前获取数据库发生错误~", err);
    });
};

module.exports = updateAndBuildSiteMap;

/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-08-16 19:21:40
 * @Description: 站点地图
 */
const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const consola = require("consola");
const CONFIG = require("../app.config");
const Tag = require("../models/Tag");
const Article = require("../models/Article");
const Category = require("../models/Carousel");
const { PUBLISH_STATE, PUBLIC_STATE, SORT_TYPE } = require("../core/constants");
const { pipeline } = require("stream");

let sitemap = null;

// 获取数据
const getDatas = (success) => {
  // sitemap

  const smStream = new SitemapStream({ hostname: CONFIG.APP.URL });
  const pipeline = smStream.pipe(createGzip());

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
          url: `/tags/${tag.slug}`,
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
      streamToPromise(pipeline).then((sm) => {
        sitemap = sm;
        success && success();
      });
      smStream.end();
    })
    .catch((err) => {
      success && success();
      consola.warn("生成地图前获取数据库发生错误", err);
    });
};

// 获取地图
const updateAndBuildSiteMap = () => {
  return new Promise((resolve, reject) => {
    getDatas(() => {
      resolve(sitemap);
      sitemap = null;
    });
  });
};

module.exports = updateAndBuildSiteMap;

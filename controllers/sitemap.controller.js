/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-08-16 18:40:55
 * @Description: 网站地图控制器
 */
const { resolve } = require("path");
const consola = require("consola");
const {
  buildController,
  initController,
  humanizedHandleError,
} = require("../core/processor");
const CONFIG = require("../app.config");
const updateAndBuildSiteMap = require("../utils/sitemap");

// controller
const SiteMapCtrl = initController();
// let sitemap;

// 获取地图
SiteMapCtrl.GET = (req, res) => {
  updateAndBuildSiteMap()
    .then((xml) => {
      res.header("Content-Type", "application/xml");
      res.header("Content-Encoding", "gzip");
      res.send(xml);
    })
    .catch((err) => {
      console.log(err, "err");
    });

  // const smStream = new SitemapStream({ hostname: CONFIG.APP.URL });
  // const pipeline = smStream.pipe(createGzip());

  // // page
  // const pages = [
  //   { url: "", changefreq: "always", priority: 1 },
  //   { url: "/about", changefreq: "monthly", priority: 1 },
  //   { url: "/sitemap", changefreq: "always", priority: 1 },
  // ];
  // pages.forEach((page) => {
  //   smStream.write(page);
  // });

  // // tag
  // const addTags = Tag.find()
  //   .sort({ _id: SORT_TYPE.desc })
  //   .then((tags) => {
  //     tags.forEach((tag) => {
  //       smStream.write({
  //         priority: 0.6,
  //         changefreq: "daily",
  //         url: `/tags/${tag.slug}`,
  //       });
  //     });
  //   });

  // // category
  // const addCategories = Category.find()
  //   .sort({ _id: SORT_TYPE.desc })
  //   .then((categories) => {
  //     categories.forEach((category) => {
  //       smStream.write({
  //         priority: 0.6,
  //         changefreq: "daily",
  //         url: `/category/${category.slug}`,
  //       });
  //     });
  //   });

  // // article
  // const addArticles = Article.find({ status: PUBLISH_STATE.published })
  //   .sort({ _id: SORT_TYPE.desc })
  //   .then((articles) => {
  //     articles.forEach((article) => {
  //       smStream.write({
  //         priority: 0.8,
  //         changefreq: "daily",
  //         url: `/article/${article.id}`,
  //         lastmodISO: article.createdAt,
  //       });
  //     });
  //   });

  // Promise.all([addTags, addCategories, addArticles])
  //   .then(() => {
  //     smStream.end();
  //     streamToPromise(pipeline).then((sm) => {
  //       sitemap = sm;
  //     });
  //   })
  //   .catch((err) => {
  //     consola.warn("生成地图前获取数据库发生错误", err);
  //   });
};

module.exports = buildController(SiteMapCtrl);

/*
 * @Author: Superficial
 * @Date: 2019-11-09 22:38:39
 * @LastEditTime: 2019-12-05 21:57:24
 * @Description: 前台路由
 */

const Router = require("koa-router");
const CategoryController = require("../controllers/category");
const ArticleController = require("../controllers/article");

const router = new Router({
  prefix: "/api"
});

router.get("/categories", CategoryController.getCategories);
router.get("/articles", ArticleController.getArticles);
router.get("/articles/:id", ArticleController.getArticle);

module.exports = router;

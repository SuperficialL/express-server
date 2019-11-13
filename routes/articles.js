/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2019-11-12 23:48:55
 * @Description: 文章相关路由
 */

const Router = require("koa-router");
const ArticleController = require("../controllers/article");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/articles", ArticleController.getArticles);
router.post("/articles", ArticleController.createArticle);
router.get("/articles/:id", ArticleController.getArticle);
router.patch("/articles/:id", ArticleController.updateArticle);
router.delete("/articles/:id", ArticleController.delArticle);

module.exports = router;

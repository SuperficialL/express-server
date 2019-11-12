/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2019-11-12 21:42:54
 * @Description: 文章相关路由
 */

const Router = require("koa-router");
const ArticleController = require("../controllers/article");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/article", ArticleController.getArticles);
router.post("/article", ArticleController.createArticle);
router.get("/article/:id", ArticleController.getArticle);
router.patch("/article/:id", ArticleController.updateArticle);
router.delete("/article/:id", ArticleController.delArticle);

module.exports = router;

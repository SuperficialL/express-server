/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2019-10-02 15:22:02
 * @Description: 文章相关路由
 */

const Router = require("koa-router");
const ArticleController = require("../controllers/article");

const router = new Router({
    prefix: "/admin/articles"
});

router.get("/", ArticleController.getArticles);
router.post("/", ArticleController.createArticle);
router.get("/:id", ArticleController.getArticle);
router.patch("/:id", ArticleController.updateArticle);
router.delete("/:id", ArticleController.delArticle);

module.exports = router;

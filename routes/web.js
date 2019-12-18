/*
 * @Author: Superficial
 * @Date: 2019-11-09 22:38:39
 * @LastEditTime : 2019-12-18 16:03:13
 * @Description: 前台路由
 */

const Router = require("koa-router");
const CategoryController = require("../controllers/category");
const ArticleController = require("../controllers/article");
const FriendLinkController = require("../controllers/friendLink");
const TimeLineController = require("../controllers/timeline");
const CommentController = require("../controllers/comment");

const router = new Router({
  prefix: "/api/web"
});

router.get("/categories", CategoryController.getCategories);
router.get("/articles", ArticleController.getArticles);
router.get("/articles/:id", ArticleController.getArticle);
router.get("/friendlinks", FriendLinkController.getFriendLinks);
router.get("/timelines", TimeLineController.getTimeLines);
router.get("/comments", CommentController.getComments);

module.exports = router;

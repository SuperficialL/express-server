/*
 * @Author: Superficial
 * @Date: 2019-11-09 22:38:39
 * @LastEditTime : 2019-12-25 23:05:25
 * @Description: 前台路由
 */

const Router = require("koa-router");
const CategoryController = require("../controllers/category");
const ArticleController = require("../controllers/article");
const FriendLinkController = require("../controllers/friendLink");
const TimeLineController = require("../controllers/timeline");
const CommentController = require("../controllers/comment");
const TagController = require("../controllers/tags");
const SiteController = require("../controllers/statistics");
const CarouselsController = require("../controllers/carousel");

const router = new Router({
  prefix: "/api/web"
});

router.get("/categories", CategoryController.getCategories);
router.get("/articles", ArticleController.getArticles);
router.get("/articles/:id", ArticleController.getArticle);
router.get("/friendslink", FriendLinkController.getFriendLinks);
router.get("/timelines", TimeLineController.getTimeLines);
router.get("/comments", CommentController.getComments);
router.post("/comments", CommentController.createComment);
router.get("/tags", TagController.getTags);
router.get("/tags/:id", TagController.getTags);
router.get("/siteinfo", SiteController.getSiteInfo);
router.get("/carousels", CarouselsController.getCarousels);

module.exports = router;

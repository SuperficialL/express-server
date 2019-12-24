/*
 * @Author: Superficial
 * @Date: 2019-12-23 23:26:20
 * @LastEditTime : 2019-12-23 23:30:29
 * @Description: 微信公众号路由
 */

const Router = require("koa-router");
const CategoryController = require("../controllers/category");
const ArticleController = require("../controllers/article");
const FriendLinkController = require("../controllers/friendLink");
const TimeLineController = require("../controllers/timeline");
const CommentController = require("../controllers/comment");
const TagController = require("../controllers/tags");
const SiteController = require("../controllers/statistics");
const WeChatController = require("../controllers/weChat");

const router = new Router({
  prefix: "/api/wechat"
});
router.get("/", WeChatController.getToken);
router.get("/categories", CategoryController.getCategories);
router.get("/articles", ArticleController.getArticles);
router.get("/articles/:id", ArticleController.getArticle);
router.get("/friendlinks", FriendLinkController.getFriendLinks);
router.get("/timelines", TimeLineController.getTimeLines);
router.get("/comments", CommentController.getComments);
router.post("/comments", CommentController.createComment);
router.get("/tags", TagController.getTags);
router.get("/tags/:id", TagController.getTags);
router.get("/siteinfo", SiteController.getSiteInfo);

module.exports = router;

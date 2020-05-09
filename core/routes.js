/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2020-03-25 11:47:22
 * @Description: 路由
 */

const Router = require("@koa/router");
const AuthCtrl = require("../controllers/auth.controller");
const ArticleCtrl = require("../controllers/article.controller");
const CategoryCtrl = require("../controllers/category.controller");
const CommentCtrl = require("../controllers/comment.controller");
const TagCtrl = require("../controllers/tag.controller");
const LinkCtrl = require("../controllers/link.controller");
const LikeCtrl = require("../controllers/like.controller");
const UploadCtrl = require("../controllers/upload.controller");

const router = new Router({
  prefix: "/api"
});


// 验证码
router.get("/captcha",AuthCtrl.generateVerifCode);

// 用户
router.post("/auth", AuthCtrl.login);
router.post("/register", AuthCtrl.register);
router.get("/profile", AuthCtrl.profile);
// router.patch("/profile", AuthCtrl.updateAuth);


// // 文章
router.get("/articles", ArticleCtrl.getArticles);
router.get("/articles/:article_id", ArticleCtrl.getArticle);
router.post("/articles", ArticleCtrl.createArticle);
router.patch("/articles/:article_id", ArticleCtrl.updateArticle);
router.delete("/articles/:article_id", ArticleCtrl.delArticle);


// // 分类
router.get("/categories", CategoryCtrl.getCategories);
router.get("/categories/:category_id", CategoryCtrl.getCategory);
router.post("/categories", CategoryCtrl.createCategory);
router.patch("/categories/:category_id", CategoryCtrl.updateCategory);
router.delete("/categories/:category_id", CategoryCtrl.delCategory);


// // 评论
router.get("/comments", CommentCtrl.getComments);
router.post("/comments", CommentCtrl.createComment);
router.get("/comments/:comment_id", CommentCtrl.getComment);
router.patch("/comments/:comment_id", CommentCtrl.updateComment);
router.delete("/comments/:comment_id", CommentCtrl.delComment);


// // 标签
router.get("/tags", TagCtrl.getTags);
router.post("/tags", TagCtrl.createTag);
router.get("/tags/:tag_id", TagCtrl.getTag);
router.patch("/tags/:tag_id", TagCtrl.updateTag);
router.delete("/tags/:tag_id", TagCtrl.delTag);


// // 点赞
// router.post("/like", LikeCtrl.isLike);

// // 友链
// router.get("/links", LinkCtrl.getFriendLinks);

// 图片上传
router.post("/uploads", UploadCtrl.uploadImg);
router.get("/qiNiuToken", UploadCtrl.uploadQiNiu);
router.post("/saveQiNiuUrl", UploadCtrl.saveQiNiuUrl);

module.exports = router;
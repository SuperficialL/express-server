/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2020-09-07 00:16:03
 * @Description: 路由
 */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { INFO, CROSS_DOMAIN, isProdMode, isDevMode } = require("../app.config");
const authIsVerified = require("../middleware/auth");
const controller = require("../controllers");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const routes = (app) => {
  // 入口中间件
  app.all("*", (req, res, next) => {
    // set Header
    const origin = req.headers.origin || "";
    const allowedOrigins = [...CROSS_DOMAIN.allowedOrigins];
    if (allowedOrigins.includes(origin) || isDevMode) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT,PATCH,POST,GET,DELETE,OPTIONS"
    );
    res.header("Access-Control-Max-Age", "1728000");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("X-Powered-By", "Nodepress 1.0.0");

    // OPTIONS request
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    // 如果是生产环境，需要验证用户来源渠道，防止非正常请求
    if (isProdMode) {
      const { origin, referer } = req.headers;
      const originVerified =
        !origin || origin.includes(CROSS_DOMAIN.allowedReferer);
      const refererVerified =
        !referer || referer.includes(CROSS_DOMAIN.allowedReferer);
      if (!originVerified && !refererVerified) {
        return res.status(403).jsonp({ code: 0, message: "来者何人！" });
      }
    }

    // 排除 (auth 的 post 请求) & (评论的 post 请求) & (like post 请求)
    const isPostUrl = (req, url) => {
      return Object.is(req.url, `/api/${url}`) && Object.is(req.method, "POST");
    };
    const isLike = isPostUrl(req, "like");
    const isPostAuth = isPostUrl(req, "auth");
    const isPostComment = isPostUrl(req, "comments");
    if (isLike || isPostAuth || isPostComment) {
      return next();
    }

    // 拦截（所有非管路员的非 get 请求，或文件上传请求）
    const notGetRequest = req.method !== "GET";
    const isFileRequest = req.url === "/qiniu";
    const isUploadRequest = req.url === "/uploads";
    const isGuestRequest = !authIsVerified(req);
    if (isGuestRequest && (notGetRequest || isFileRequest || isUploadRequest)) {
      return res.status(403).jsonp({ code: 0, message: "来者何人！" });
    }

    // 其他情况都通行
    next();
  });

  router.all("/auth", controller.auth);

  router.all("/articles", controller.articles.list);
  router.all("/articles/:article_id", controller.articles.item);

  router.all("/categories", controller.category.list);
  router.all("/categories/:category_id", controller.category.item);

  router.all("/tags", controller.tag.list);
  router.all("/tags/:tag_id", controller.tag.item);

  router.all("/comments", controller.comment.list);
  router.all("/comments/:comment_id", controller.comment.item);

  // 友链
  router.all("/links", controller.link.list);
  // router.all("/links/:link_id", controller.link.item);

  // 公告
  router.all("/notices", controller.notice.list);
  router.all("/notices/:notice_id", controller.notice.item);

  // statistic
  router.get("/statistic", controller.statistic);

  // like
  router.post("/like", controller.like);

  // 文件上传
  router.post("/uploads", upload.single("file"), controller.upload);

  // 站点地图
  app.get("/sitemap.xml", controller.sitemap);

  // 接口信息
  app.get("/", (_, res) => {
    res.jsonp(INFO);
  });

  // 验证码
  // router.get("/captcha", AuthCtrl.generateVerifCode);

  // // 用户
  // router.post("/auth", AuthCtrl.login);
  // router.post("/register", AuthCtrl.register);
  // router.get("/profile", AuthCtrl.profile);
  // // router.patch("/profile", AuthCtrl.updateAuth);

  // // 图片上传
  // router.post("/uploads", FileCtrl.uploadImg);
  // router.get("/qiNiuToken", FileCtrl.uploadQiNiu);
  // router.get("/token", FileCtrl.getQiNiuToken);
  // router.post("/saveQiNiuUrl", FileCtrl.saveQiNiuUrl);

  // // 音乐
  // router.get("/musices", FileCtrl.getMusic)

  // // 图片
  // router.post("/pictures", PicCtrl.createPicture);
  // router.get("/pictures", PicCtrl.getPictures);
  // router.patch("/pictures/:pic_id", PicCtrl.updatePicture);
  // router.delete("/pictures/:pic_id", PicCtrl.delPicture);

  app.use("/api", router);

  app.use("*", (_, res) => {
    res.status(404).jsonp({ code: 1, message: "404" });
  });
};

module.exports = routes;

/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2020-09-14 12:02:02
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
      return Object.is(req.url, url) && Object.is(req.method, "POST");
    };
    const isLike = isPostUrl(req, "/like");
    const isPostAuth = isPostUrl(req, "/auth");
    const isPostComment = isPostUrl(req, "/comments");

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

  // 接口信息
  app.get("/", (_, res) => {
    res.jsonp(INFO);
  });

  app.all("/auth", controller.auth);

  app.all("/articles", controller.articles.list);
  app.all("/articles/:article_id", controller.articles.item);

  app.all("/categories", controller.category.list);
  app.all("/categories/:category_id", controller.category.item);

  app.all("/tags", controller.tag.list);
  app.all("/tags/:tag_id", controller.tag.item);

  app.all("/comments", controller.comment.list);
  app.all("/comments/:comment_id", controller.comment.item);

  // 友链
  app.all("/links", controller.link.list);
  // app.all("/links/:link_id", controller.link.item);

  // 公告
  app.all("/notices", controller.notice.list);
  app.all("/notices/:notice_id", controller.notice.item);

  // 站点配置
  app.all("/option", controller.option);

  // statistic
  app.get("/statistic", controller.statistic);

  // like
  app.post("/like", controller.like);

  // 文件上传
  app.post("/uploads", upload.single("file"), controller.upload);

  // 站点地图
  app.get("/sitemap.xml", controller.sitemap);

  // app.use("/", router);

  app.use("*", (_, res) => {
    res.status(404).jsonp({ code: 1, message: "404" });
  });
};

module.exports = routes;

/*
 * @Author: Superficial
 * @Date: 2020-01-22 09:38:08
 * @LastEditTime : 2020-01-22 10:07:00
 * @Description: 验证码路由
 */
const Router = require("koa-router");
const CaptchaController = require("../controllers/captcha");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/captcha", CaptchaController.create);

module.exports = router;
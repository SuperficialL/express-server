/*
 * @Author: Superficial
 * @Date: 2019-12-23 23:26:20
 * @LastEditTime : 2019-12-25 17:13:24
 * @Description: 微信公众号路由
 */

const Router = require("koa-router");
const WeChatController = require("../controllers/weChat");

const router = new Router({
  prefix: "/api/wechat"
});

router.get("/", WeChatController.getToken);

module.exports = router;

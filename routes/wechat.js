/*
 * @Author: Superficial
 * @Date: 2019-12-23 23:26:20
 * @LastEditTime : 2020-02-04 18:44:57
 * @Description: 微信公众号路由
 */

const Router = require("koa-router");
const WeChatController = require("../controllers/weChat");

const router = new Router({
  prefix: "/api/wechat"
});

router.get("/", WeChatController.validateServer);

module.exports = router;

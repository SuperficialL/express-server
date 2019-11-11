/*
 * @Author: Superficial
 * @Date: 2019-11-09 22:38:39
 * @LastEditTime: 2019-11-10 14:22:03
 * @Description: 前台路由
 */

const Router = require("koa-router");
const router = new Router({
  prefix: "/"
});

router.get("/", async ctx => {
  ctx.body =
    "<h1>服务器已正常启动!但博主正在规划中,网站将会在未来展现在你眼前</h1>";
  // ctx.body = {
  //   code: 200,
  //   message: "服务器已正常启动!但博主正在规划中,网站将会在未来展现在你眼前"
  // };
});

module.exports = router;

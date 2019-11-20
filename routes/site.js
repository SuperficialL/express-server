/*
 * @Author: Superficial
 * @Date: 2019-11-14 22:41:32
 * @LastEditTime: 2019-11-14 22:50:04
 * @Description: 站点路由
 */

const Router = require("koa-router");
const Site = require("../controllers/statistics");
const router = new Router({
  prefix: "/api/admin"
});

router.get("/siteinfo", Site.getSiteInfo);

module.exports = router;

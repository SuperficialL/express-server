/*
 * @Author: Superficial
 * @Date: 2019-11-09 22:38:39
 * @LastEditTime : 2019-12-25 17:15:28
 * @Description: 前台路由
 */

const Router = require("koa-router");
const TimeLineController = require("../controllers/timeline");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/timelines", TimeLineController.getTimeLines);
router.post("/timelines", TimeLineController.createTimeLine);
router.get("/timelines/:id", TimeLineController.getTimeLine);
router.patch("/timelines/:id", TimeLineController.updateTimeLine);
router.delete("/timelines/:id", TimeLineController.deleteTimeLine);

module.exports = router;

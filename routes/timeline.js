/*
 * @Author: Superficial
 * @Date: 2019-11-09 22:38:39
 * @LastEditTime: 2019-11-20 22:45:56
 * @Description: 前台路由
 */

const Router = require("koa-router");
const TimeLineController = require("../controllers/timeline");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/timelines", TimeLineController.getTimeLines);
router.get("/timelines/:id", TimeLineController.getTimeLine);
router.post("/timelines", TimeLineController.createTimeLine);
router.patch("/timelines/:id", TimeLineController.updateTimeLine);
router.delete("/timelines/:id", TimeLineController.deleteTimeLine);

module.exports = router;

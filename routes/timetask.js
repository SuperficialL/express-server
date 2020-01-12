/*
 * @Author: Superficial
 * @Date: 2020-01-03 17:31:28
 * @LastEditTime : 2020-01-04 16:46:23
 * @Description: 定时任务路由
 */

const Router = require("koa-router");
const TimeTaskController = require("../controllers/timetask");
const router = new Router({
  prefix: "/api/admin"
});

router.get("/tasks", TimeTaskController.getTimeTasks);
router.get("/tasks/:id", TimeTaskController.getTimeTask);
router.post("/tasks", TimeTaskController.createTimeTask);
router.patch("/tasks/:id", TimeTaskController.updateTimeTask);
router.delete("/tasks/:id", TimeTaskController.delTimeTask);

module.exports = router;

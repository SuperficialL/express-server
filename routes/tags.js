/*
 * @Author: Superficial
 * @Date: 2019-10-02 14:54:19
 * @LastEditTime: 2019-11-12 23:45:44
 * @Description: 标签路由
 */

const Router = require("koa-router");
const TagController = require("../controllers/tags");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/tags", TagController.getTags);
router.post("/tags", TagController.createTag);
router.get("/tags/:id", TagController.getTag);
router.patch("/tags/:id", TagController.updateTag);
router.delete("/tags/:id", TagController.delTag);

module.exports = router;

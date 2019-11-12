/*
 * @Author: Superficial
 * @Date: 2019-10-02 14:54:19
 * @LastEditTime: 2019-11-12 21:43:20
 * @Description: 标签路由
 */

const Router = require("koa-router");
const TagController = require("../controllers/tags");

const router = new Router({
  prefix: "/api/admin/tags"
});

router.get("/", TagController.getTags);
router.post("/", TagController.createTag);
router.get("/:id", TagController.getTag);
router.patch("/:id", TagController.updateTag);
router.delete("/:id", TagController.delTag);

module.exports = router;

/*
 * @Author: Superficial
 * @Date: 2020-03-25 17:56:19
 * @LastEditTime: 2020-03-25 17:57:07
 * @Description: 权限接口
 */

const Router = require("koa-router");
const PermissionController = require("../controllers/permission");
const router = new Router({
  prefix: "/api/admin"
});

router.get("/permissions", PermissionController.getPermissions);
router.post("/permissions", PermissionController.createPermission);
router.get("/permissions/:id", PermissionController.getPermission);
router.patch("/permissions/:id", PermissionController.updatePermission);
router.delete("/permissions/:id", PermissionController.delPermission);

module.exports = router;

/*
 * @Author: Superficial
 * @Date: 2020-03-25 15:49:34
 * @LastEditTime: 2020-03-25 15:55:03
 * @Description: 角色相关路由
 */

const Router = require("koa-router");
const RoleController = require("../controllers/role");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/roles", RoleController.getRoles);
router.post("/roles", RoleController.createRole);
router.get("/roles/:id", RoleController.getRole);
router.patch("/roles/:id", RoleController.updateRole);
router.delete("/roles/:id", RoleController.delRole);

module.exports = router;

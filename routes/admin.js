/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2020-03-25 11:47:22
 * @Description: 用户相关路由
 */

const Router = require("koa-router");
const AdminController = require("../controllers/admin");

const router = new Router({
  prefix: "/api/admin"
});

router.post("/login", AdminController.login);
router.post("/register", AdminController.register);
router.get("/profile", AdminController.profile);
router.patch("/profile", AdminController.updateAdmin);
router.get("/users", AdminController.getUsers);
router.get("/users/:id", AdminController.getUser);
router.patch("/users/:id", AdminController.updateUser);
router.delete("/users/:id", AdminController.delUser);

module.exports = router;

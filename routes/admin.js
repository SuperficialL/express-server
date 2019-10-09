/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:35:10
 * @LastEditTime: 2019-10-09 22:23:29
 * @Description: 用户相关路由
 */

const Router = require("koa-router");
const AdminController = require("../controllers/admin");

const router = new Router({
	prefix: "/admin"
});

router.post("/login", AdminController.login);
router.post("/register", AdminController.register);
router.get("/profile", AdminController.profile);
router.patch("/profile", AdminController.updateAdmin);
router.get("/users", AdminController.getUsers);
router.get("/users/:id", AdminController.getUser);
router.delete("/users/:id", AdminController.delUser);

module.exports = router;

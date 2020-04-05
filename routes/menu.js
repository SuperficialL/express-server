/*
 * @Author: Superficial
 * @Date: 2019-10-02 02:58:46
 * @LastEditTime: 2020-03-27 17:07:35
 * @Description: 菜单路由
 */
const Router = require("koa-router");
const MenuController = require("../controllers/menu");

const router = new Router({
  prefix: "/api/admin"
});

router.get("/menus", MenuController.getMenus);
router.post("/menus", MenuController.createMenu);
router.get("/menus/:id", MenuController.getMenu);
router.patch("/menus/:id", MenuController.updateMenu);
router.delete("/menus/:id", MenuController.delMenu);

module.exports = router;

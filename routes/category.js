/*
 * @Author: Superficial
 * @Date: 2019-10-02 02:58:46
 * @LastEditTime: 2019-11-11 23:51:39
 * @Description: 分类路由
 */
const Router = require("koa-router");
const CategoryController = require("../controllers/category");

const router = new Router({
  prefix: "/api/categories"
});

router.get("/categories", CategoryController.getCategories);
router.post("/categories", CategoryController.createCategory);
router.get("/categories/:id", CategoryController.getCategory);
router.patch("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.delCategory);

module.exports = router;

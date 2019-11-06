/*
 * @Author: Superficial
 * @Date: 2019-10-02 02:58:46
 * @LastEditTime: 2019-11-06 21:27:37
 * @Description: 分类路由
 */
const Router = require("koa-router");
const CategoryController = require("../controllers/category");

const router = new Router({
  prefix: "/admin/categories"
});

router.get("/", CategoryController.getCategories);
router.post("/", CategoryController.createCategory);
router.get("/:id", CategoryController.getCategory);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.delCategory);

module.exports = router;

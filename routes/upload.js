/*
 * @Author: Superficial
 * @Date: 2019-11-06 21:57:27
 * @LastEditTime: 2019-11-12 21:43:27
 * @Description: 上传路由
 */

const Router = require("koa-router");
const UploadController = require("../controllers/upload");

const router = new Router({
  prefix: "/api/admin/uploads"
});

router.post("/", UploadController.uploadImg);

module.exports = router;

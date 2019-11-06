/*
 * @Author: Superficial
 * @Date: 2019-11-06 21:57:27
 * @LastEditTime: 2019-11-06 22:15:22
 * @Description: 上传路由
 */

const Router = require("koa-router");
const UploadController = require("../controllers/upload");

const router = new Router({
  prefix: "/admin/uploads"
});

router.post("/", UploadController.uploadImg);

module.exports = router;

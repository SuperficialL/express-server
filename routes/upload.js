/*
 * @Author: Superficial
 * @Date: 2019-11-06 21:57:27
 * @LastEditTime: 2019-11-12 23:45:55
 * @Description: 上传路由
 */

const Router = require("koa-router");
const UploadController = require("../controllers/upload");

const router = new Router({
  prefix: "/api/admin"
});

router.post("/uploads", UploadController.uploadImg);

module.exports = router;

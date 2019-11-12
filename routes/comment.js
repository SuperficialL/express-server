/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:35:58
 * @LastEditTime: 2019-11-12 23:45:28
 * @Description: 评论路由
 */

const Router = require("koa-router");
const CommentController = require("../controllers/comment");
const router = new Router({
  prefix: "/api/admin"
});

router.get("/comments", CommentController.getComments);
router.post("/comments", CommentController.createComment);
router.get("/comments/:id", CommentController.getComment);
router.patch("/comments/:id", CommentController.updateComment);
router.delete("/comments/:id", CommentController.delComment);

module.exports = router;

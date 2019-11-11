/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:35:58
 * @LastEditTime: 2019-11-10 15:24:13
 * @Description: 评论路由
 */

const Router = require("koa-router");
const CommentController = require("../controllers/comment");
const router = new Router({
  prefix: "/admin/comments"
});

router.get("/", CommentController.getComments);
router.post("/", CommentController.createComment);
router.get("/:id", CommentController.getComment);
router.patch("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.delComment);

module.exports = router;

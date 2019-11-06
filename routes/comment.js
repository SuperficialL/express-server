/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:35:58
 * @LastEditTime: 2019-11-05 22:39:20
 * @Description: 评论路由
 */

const Router = require("koa-router");
const CommentController = require("../controllers/comment");
const router = new Router({
  prefix: "/admin/comments"
});

router.get("/", CommentController.getComments);
router.get("/:id", CommentController.getComment);
router.post("/:id", CommentController.createComment);
router.put("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.delComment);

module.exports = router;

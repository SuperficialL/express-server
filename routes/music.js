/*
 * @Author: Superficial
 * @Date: 2020-02-28 18:51:32
 * @LastEditTime: 2020-02-28 18:52:32
 * @Description: 音乐路由
 */

const Router = require("koa-router");
const MusicController = require("../controllers/music");
const router = new Router({
  prefix: "/api/admin"
});

router.get("/musics", MusicController.getMusics);
router.post("/musics", MusicController.createMusic);
router.get("/musics/:id", MusicController.getMusic);
router.patch("/musics/:id", MusicController.updateMusic);
router.delete("/musics/:id", MusicController.delMusic);

module.exports = router;

/*
 * @Author: Superficial
 * @Date: 2019-12-25 11:58:46
 * @LastEditTime : 2019-12-25 17:15:04
 * @Description: 轮播路由
 */

const Router = require("koa-router");
const CarouselController = require("../controllers/carousel");

const router = Router({
  prefix: "/api/admin"
});

router.get("/carousels", CarouselController.getCarousels);
router.post("/carousels", CarouselController.getCarousels);
router.get("/carousels/:id", CarouselController.getCarousel);
router.patch("/carousels/:id", CarouselController.updateCarousel);
router.delete("/carousels/:id", CarouselController.delCarousel);

module.exports = router;
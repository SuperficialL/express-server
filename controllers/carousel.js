/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2019-12-25 11:57:13
 * @Description: 文章控制器
 */

const Carousel = require("../models/Carousel");
const Response = require("../utils/helper");

class CarouselController {
  // 查询所有轮播
  async getCarousels(ctx) {
    const carousels = await Carousel.find();
    ctx.body = new Response().json(carousels);
  }

  // 获取单个轮播数据
  async getCarousel(ctx) {
    const { id } = ctx.params;
    const carousel = await Carousel.findById(id);
    ctx.body = new Response().json(carousel);
  }

  // 更新轮播数据
  async updateCarousel(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const carousel = await Carousel.findByIdAndUpdate(id, update, { new: true });
    ctx.body = carousel
      ? new Response().success("轮播更新成功~")
      : new Response().success("轮播不存在~");
  }

  // 删除轮播数据
  async delCarousel(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const carousel = await Carousel.findByIdAndUpdate(id, update, { new: true });
    ctx.body = carousel
      ? new Response().success("轮播删除成功~")
      : new Response().success("轮播不存在~");
  }
}

module.exports = new CarouselController();

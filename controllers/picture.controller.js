/*
 * @Author: Superficial
 * @Date: 2020-02-28 18:44:14
 * @LastEditTime: 2020-05-14 13:53:02
 * @Description: 图片控制器
 */

const Picture = require("../models/Picture");
const { handlePaginateData, handleSuccess, handleError } = require("../utils/helper");

class PictureController {
  async getPictures(ctx) {
    const [page, per_page] = [ctx.query.page || 1, ctx.query.per_page].map(k => Number(k));
    // 过滤条件
    const options = {
      page,
      lean: true,
      leanWithId: false
    }

    if (!isNaN(per_page)) {
      options.limit = per_page;
    }
    const pictures = await Picture.paginate({}, options);
    ctx.body = handleSuccess({
      result: handlePaginateData(pictures),
      message: "图片获取成功~"
    })
  }

  async getPicture(ctx) {
    const { pic_id } = ctx.params;
    const picture = await Picture.findById(pic_id);
    ctx.body = picture
      ? new Response().json({ picture })
      : new Response().success("图片不存在~");
  }

  async createPicture(ctx) {
    const { name, imageUrl, key, hash, size, type } = ctx.request.body;
    const picture = await new Picture({ name, imageUrl, key, hash, size, type }).save();
    ctx.body = picture
      ? handleSuccess({ message: "图片添加成功~" })
      : handleError({ message: "图片添加失败~" });
  }

  async updatePicture(ctx) {
    const { pic_id } = ctx.params;
    const { ...update } = ctx.request.body;
    const picture = await Picture.findByIdAndUpdate(pic_id, update, {
      new: true
    });
    ctx.body = picture
      ? handleSuccess({ message: "图片更新成功~" })
      : handleError({ message: "图片不存在~" });
  }

  async delPicture(ctx) {
    const { pic_id } = ctx.params;
    const picture = await Picture.findByIdAndRemove(pic_id);
    ctx.body = picture
      ? handleSuccess({ message: "图片删除成功~" })
      : handleError({ message: "图片不存在~" });
  }
}

module.exports = new PictureController();
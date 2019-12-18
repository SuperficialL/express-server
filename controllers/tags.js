/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2019-12-18 15:43:09
 * @Description:  标签控制器
 */

const Tag = require("../models/Tag");
const Response = require("../utils/helper");

class TagController {
  // 获取所有标签
  async getTags(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Tag.countDocuments();
    const tags = await Tag.find(query).skip(skip).limit(Number(per_page));
    ctx.body = new Response().json({ tags, total });
  }

  // 获取标签详情
  async getTag(ctx) {
    const { id } = ctx.params;
    const tag = await Tag.findById(id);
    ctx.body = tag
      ? new Response().json(tag)
      : new Response().error("标签不存在~");
  }

  // 创建标签
  async createTag(ctx) {
    const { ...data } = ctx.request.body;
    await new Tag(data).save();
    ctx.body = new Response().success("标签创建成功~");
  }

  // 修改标签
  async updateTag(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const tag = await Tag.findByIdAndUpdate(id, update);
    ctx.body = tag
      ? new Response().success("标签修改成功~")
      : new Response().error("标签修改失败~");
  }

  // 删除标签
  async delTag(ctx) {
    const { id } = ctx.params;
    const tag = await Tag.findByIdAndRemove(id);
    ctx.body = tag
      ? new Response().success("标签刪除成功~")
      : new Response().error("标签刪除失败~");
  }
}

module.exports = new TagController();

/*
 * @Author: Superficial
 * @Date: 2019-10-28 17:46:31
 * @LastEditTime : 2019-12-18 15:56:44
 * @Description: 文件上传
 */
const TimeLine = require("../models/TimeLine");
const Response = require("../utils/helper");

class TimeLineController {
  async getTimeLines(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await TimeLine.countDocuments();
    const timelines = await TimeLine.find(query).skip(skip).limit(Number(per_page));
    ctx.body = new Response().json({ timelines, total });
  }

  async getTimeLine(ctx) {
    const { id } = ctx.params;
    const timeline = await TimeLine.findById(id);
    ctx.body = timeline
      ? new Response().json(timeline)
      : new Response().error("时间线不存在~");
  }

  async createTimeLine(ctx) {
    const { ...data } = ctx.request.body;
    await new TimeLine(data).save();
    ctx.body = new Response().success("时间线创建成功~");
  }

  async updateTimeLine(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const timeline = await TimeLine.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = timeline
      ? new Response().json(timeline)
      : new Response().error("时间线不存在~");
  }

  async deleteTimeLine(ctx) {
    const { id } = ctx.params;
    const timeline = await TimeLine.findByIdAndRemove(id);
    ctx.body = timeline
      ? new Response().success("标签刪除成功~")
      : new Response().error("标签刪除失败~");
  }
}

module.exports = new TimeLineController();

/*
 * @Author: Superficial
 * @Date: 2019-10-28 17:46:31
 * @LastEditTime: 2019-11-20 22:52:43
 * @Description: 文件上传
 */
const TimeLine = require("../models/TimeLine");
const Response = require("../utils/helper");

class TimeLineController {
  async getTimeLines(ctx) {
    const timelines = await TimeLine.find();
    ctx.body = new Response().json(timelines);
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

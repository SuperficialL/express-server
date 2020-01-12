/*
 * @Author: Superficial
 * @Date: 2020-01-03 17:22:32
 * @LastEditTime : 2020-01-04 20:50:36
 * @Description: 定时任务控制器
 */
const TimeTask = require("../models/TimeTask");
const Response = require("../utils/helper");
const { setTask } = require("../utils/task");
class TimeTaskController {
  async getTimeTasks(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await TimeTask.countDocuments();
    const timetasks = await TimeTask.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(Number(per_page));
    ctx.body = new Response().json({ timetasks, total });
  }

  async getTimeTask(ctx) {
    const { id } = ctx.params;
    const timetask = await TimeTask.findById(id);
    ctx.body = timetask ?
      new Response().json(timetask) :
      new Response().error("定时任务不存在~");
  }

  async createTimeTask(ctx) {
    const { ...data } = ctx.request.body;
    await new TimeTask(data).save();
    setTask();
    ctx.body = new Response().success("定时任务创建成功~");
  }

  async updateTimeTask(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const timetask = await TimeTask.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = timetask
      ? new Response().json(timetask)
      : new Response().error("定时任务不存在~");
  }

  async delTimeTask(ctx) {
    const { id } = ctx.params;
    const timetask = await TimeTask.findByIdAndRemove(id);
    ctx.body = timetask
      ? new Response().success("定时任务刪除成功~")
      : new Response().error("定时任务刪除失败~");
  }
}

module.exports = new TimeTaskController();
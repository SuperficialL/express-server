/*
 * @Author: Superficial
 * @Date: 2019-11-05 22:32:54
 * @LastEditTime : 2019-12-25 17:23:12
 * @Description: 留言控制器
 */
const Message = require("../models/Message");
const Response = require("../utils/helper");

class MessageController {
  async getMessages(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Message.countDocuments();
    const messages = await Message.find(query)
      .skip(skip)
      .limit(Number(per_page));
    ctx.body = new Response().json({ messages, total });
  }

  async getComment(ctx) {
    const { id } = ctx.params;
    const message = await Message.findById(id);
    ctx.body = message
      ? new Response().json({ message })
      : new Response().success("留言不存在~");
  }

  async createComment(ctx) {
    const { author, content } = ctx.request.body;
    await new Message({ author, content }).save();
    ctx.body = new Response().success("留言创建成功");
  }

  async updateMessage(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const message = await Message.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = message
      ? new Response().success("留言更新成功~")
      : new Response().success("留言不存在~");
  }

  async delMessage(ctx) {
    const { id } = ctx.params;
    const message = await Message.findByIdAndRemove(id);
    ctx.body = message
      ? new Response().success("留言删除成功~")
      : new Response().success("留言不存在~");
  }
}

module.exports = new MessageController();

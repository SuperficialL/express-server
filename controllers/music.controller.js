/*
 * @Author: Superficial
 * @Date: 2020-02-28 18:44:14
 * @LastEditTime: 2020-02-28 18:51:16
 * @Description: 音乐控制器
 */

const Music = require("../models/Music");
const Response = require("../utils/helper");

class MusicController {
  async getMusics(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Music.countDocuments(query);
    const musics = await Music.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(Number(per_page));
    ctx.body = new Response().json({ musics, total });
  }

  async getMusic(ctx) {
    const { id } = ctx.params;
    const music = await Music.findById(id);
    ctx.body = music
      ? new Response().json({ music })
      : new Response().success("音乐不存在~");
  }

  async createMusic(ctx) {
    const { author, content } = ctx.request.body;
    await new Music({ author, content }).save();
    ctx.body = new Response().success("音乐创建成功");
  }

  async updateMusic(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const music = await Music.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = music
      ? new Response().success("音乐更新成功~")
      : new Response().success("音乐不存在~");
  }

  async delMusic(ctx) {
    const { id } = ctx.params;
    const music = await Music.findByIdAndRemove(id);
    ctx.body = music
      ? new Response().success("音乐删除成功~")
      : new Response().success("音乐不存在~");
  }
}

module.exports = new MusicController();
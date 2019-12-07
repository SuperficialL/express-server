/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-12-04 20:59:57
 * @Description:  标签控制器
 */

const FriendLink = require("../models/FriendLink");
const Response = require("../utils/helper");

class FriendLinkController {
  // 获取所有标签
  async getFriendLinks(ctx) {
    const friendLinks = await FriendLink.find();
    const total = await FriendLink.countDocuments();
    ctx.body = new Response().json({ friendLinks, total });
  }

  // 获取友链详情
  async getFriendLink(ctx) {
    const { id } = ctx.params;
    const friendLink = await FriendLink.findById(id);
    ctx.body = friendLink
      ? new Response().json(friendLink)
      : new Response().error("友链不存在~");
  }

  // 创建友链
  async createFriendLink(ctx) {
    const { ...data } = ctx.request.body;
    await new FriendLink(data).save();
    ctx.body = new Response().success("友链创建成功~");
  }

  // 修改友链
  async updateFriendLink(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const friendLink = await FriendLink.findByIdAndUpdate(id, update);
    ctx.body = friendLink
      ? new Response().success("友链修改成功~")
      : new Response().error("友链修改失败~");
  }

  // 删除友链
  async delFriendLink(ctx) {
    const { id } = ctx.params;
    const friendLink = await friendLink.findByIdAndRemove(id);
    ctx.body = friendLink
      ? new Response().success("友链刪除成功~")
      : new Response().error("友链刪除失败~");
  }
}

module.exports = new FriendLinkController();

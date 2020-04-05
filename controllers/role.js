/*
 * @Author: Superficial
 * @Date: 2020-03-25 15:50:21
 * @LastEditTime: 2020-03-27 16:57:52
 * @Description: 角色控制器
 */

const Role = require("../models/Role");
const Response = require("../utils/helper");

class RoleController {
  async getRoles(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Role.countDocuments(query);
    const roles = await Role.find(query)
      .sort({ _id: -1 })
      .populate("permissions", "menus")
      .skip(skip)
      .limit(Number(per_page));
    ctx.body = new Response().json({ roles, total });
  }

  async getRole(ctx) {
    const { id } = ctx.params;
    const role = await Role.findById(id);
    ctx.body = role
      ? new Response().json({ role })
      : new Response().success("角色不存在~");
  }

  async createRole(ctx) {
    const { name, desc, others } = ctx.request.body;
    await new Role({
      name,
      desc,
      ...others
    }).save();
    ctx.body = new Response().success("角色创建成功");
  }

  async updateRole(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const role = await Role.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = role
      ? new Response().success("角色更新成功~")
      : new Response().success("角色不存在~");
  }

  async delRole(ctx) {
    const { id } = ctx.params;
    const role = await Role.findByIdAndRemove(id);
    ctx.body = role
      ? new Response().success("角色删除成功~")
      : new Response().success("角色不存在~");
  }
}

module.exports = new RoleController();


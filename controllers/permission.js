/*
 * @Author: Superficial
 * @Date: 2020-03-25 17:54:32
 * @LastEditTime: 2020-03-25 18:17:31
 * @Description: 权限控制器
 */

const Permission = require("../models/Permission");
const Response = require("../utils/helper");

class PermissionController {
  async getPermissions(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Permission.countDocuments(query);
    const permissions = await Permission.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(Number(per_page));
    ctx.body = new Response().json({ permissions, total });
  }

  async getPermission(ctx) {
    const { id } = ctx.params;
    const permission = await Permission.findById(id);
    ctx.body = permission
      ? new Response().json({ permission })
      : new Response().success("权限不存在~");
  }

  async createPermission(ctx) {
    const { name, method, parent } = ctx.request.body;
    const data = parent
      ? {
        name,
        method,
        parent
      }
      : {
        name,
        method
      };
    const exist = await Permission.findOne({name});
    if (!exist) {
      await new Permission(data).save();
    }
    const message = exist?"权限已存在~" : "权限创建成功~";
    ctx.body = new Response().success(message);
  }

  async updatePermission(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const permission = await Permission.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = permission
      ? new Response().success("权限更新成功~")
      : new Response().success("权限不存在~");
  }

  async delPermission(ctx) {
    const { id } = ctx.params;
    const permission = await Permission.findByIdAndRemove(id);
    ctx.body = permission
      ? new Response().success("权限删除成功~")
      : new Response().success("权限不存在~");
  }
}

module.exports = new PermissionController();

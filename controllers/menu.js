/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-04-07 17:56:19
 * @Description: 菜单路由控制器
 */
const Menu = require("../models/Menu");
const Response = require("../utils/helper");
const HttpException = require("../core/http-exception");

class MenuController {
  // 获取所有菜单
  async getMenus(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Menu.countDocuments(query);
    const menus = await Menu.find(query)
      .skip(skip)
      .limit(Number(per_page));
    let menuList = [];
    menus.forEach(menu => menuList.push(menu._id));
    ctx.body = new Response().json({ menus, total, menuList });
  }

  // 获取菜单详情
  async getMenu(ctx) {
    const { id } = ctx.params;
    const menu = await Menu.findById(id).populate({
      path: "parent"
    });
    ctx.body = menu
      ? new Response().json(menu)
      : new Response().success("菜单不存在~");
  }
  // 菜单名
  // name: {
  // parent: {
  // path: { type: String },
  // components: { type: String },
  // icon: { type: String },
  // ordering: { type: Number },
  // isMenu: { type: Boolean },
  // isShow: { type: Boolean }
  // 创建菜单
  async createMenu(ctx) {
    const { name, parent, ...others } = ctx.request.body;
    console.log(parent, "parent");
    if (!name) throw new HttpException(20005, "菜单名不可为空~");
    const data = parent
      ? {
        name,
        parent,
        ...others
      }
      : {
        name,
        ...others
      };
    await new Menu(data).save();
    ctx.body = new Response().success("菜单创建成功~");
  }

  // 修改菜单
  async updateMenu(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    const menu = await Menu.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = menu
      ? new Response().success("菜单修改成功~")
      : new Response().success("菜单不存在~");
  }

  // 删除菜单
  async delMenu(ctx) {
    const { id } = ctx.params;
    const menu = await Menu.findByIdAndRemove(id);
    ctx.body = menu
      ? new Response().success("菜单删除成功~")
      : new Response().success("菜单不存在~");
  }
}

module.exports = new MenuController();

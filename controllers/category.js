/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2019-12-28 21:12:41
 * @Description: 分类路由控制器
 */
const Category = require("../models/Category");
const Response = require("../utils/helper");
const HttpException = require("../core/http-exception");

class CategoryController {
  // 获取所有分类
  async getCategories(ctx) {
    const { page = 1, per_page = 10, ...query } = ctx.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    const total = await Category.countDocuments();
    const categories = await Category.find(query)
      .skip(skip)
      .limit(Number(per_page));
    ctx.body = new Response().json({ categories, total });
  }

  // 获取分类详情
  async getCategory(ctx) {
    const { id } = ctx.params;
    const category = await Category.findById(id).populate({
      path: "parent"
    });
    ctx.body = category
      ? new Response().json(category)
      : new Response().success("分类不存在~");
  }

  // 创建分类
  async createCategory(ctx) {
    const { name, parent, ...others } = ctx.request.body;
    console.log(others);
    if (!name) throw new HttpException(20005, "分类名不可为空~");
    const data = parent
      ? {
        name,
        parent,
        others
      }
      : {
        name,
        others
      };

    await new Category(data).save();
    ctx.body = new Response().success();
  }

  // 修改分类
  async updateCategory(ctx) {
    const { id } = ctx.params;
    const { ...update } = ctx.request.body;
    console.log(update);
    const category = await Category.findByIdAndUpdate(id, update, {
      new: true
    });
    ctx.body = category
      ? new Response().success("分类修改成功~")
      : new Response().success("分类不存在~");
  }

  // 删除分类
  async delCategory(ctx) {
    const { id } = ctx.params;
    const category = await Category.findByIdAndRemove(id);
    ctx.body = category
      ? new Response().success("分类删除成功~")
      : new Response().success("分类不存在~");
  }
}

module.exports = new CategoryController();

/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-03-25 18:16:13
 * @Description: 分类路由控制器
 */
const Category = require("../models/Category");
const Article = require("../models/Article");
const { Response,handlePaginateData,handleSuccess,handleError } = require("../utils/helper");
const HttpException = require("../core/http-exception");
const { authIsVerified } = require("../middleware/auth");
const { numberIsInvalid, arrayIsInvalid, objectValues } = require("../utils/tools")
const { PUBLISH_STATE, PUBLIC_STATE, ORIGIN_STATE, SORT_TYPE, REDIS_CACHE_FIELDS } = require("../core/constants");

class CategoryController {
  // 获取所有分类
  async getCategories(ctx) {
    const [ page, per_page ] = [ ctx.query.page || 1, ctx.query.per_page ].map(k => Number(k))

    // 过滤条件
    const options = {
      page,
      sort: { _id: SORT_TYPE.desc },
      lean: true,
      leanWithId:false
    }
    
    if (!isNaN(per_page)) {
      options.limit = per_page;
    }

    const categories = await Category.paginate({}, options);
    const $match = authIsVerified(ctx) 
      ? {}
      : { state: PUBLISH_STATE.published, public: PUBLIC_STATE.public };
    const counts = await Article.aggregate([
      { $match },
      { $unwind: '$category' },
      { $group: {
        _id: '$category',
        num_tutorial: { $sum: 1 }}
      }
    ]);
    const newCtefories = categories.docs.map(category => {
      const finded = counts.find(c => String(c._id) === String(category._id))
      category.count = finded ? finded.num_tutorial : 0
      return category;
    });
    categories.docs = newCtefories;
    ctx.body = handleSuccess({
      result: handlePaginateData(categories),
      message: "分类获取成功~"
    });
  }

  // 获取分类详情
  async getCategory(ctx) {
    const { category_id } = ctx.params;
    let category = await Category.findById(category_id).populate(['parent']);
    category = category.toObject();
    ctx.body = category
      ? new Response().json({category})
      : new Response().success("分类不存在~");
  }

  // 创建分类
  async createCategory(ctx) {
    const { name, slug, ...other } = ctx.request.body;
    if (!name) throw new HttpException(20005, "分类名不可为空~");
    const res = await new Category({
      name,
      slug,
      ...other
    }).save();
    ctx.body = res
      ? handleSuccess({message: "分类创建成功~"})
      : handleError({message: "分类创建成功~"});
  }

  // 修改分类
  async updateCategory(ctx) {
    const { category_id } = ctx.params;
    const { name, slug, parent, icon, ordering } = ctx.request.body;
    console.log(icon,"sss");
    const res = await Category.findByIdAndUpdate(category_id, {name, slug, parent, icon, ordering }, { new: true });
    ctx.body = res
      ? handleSuccess({message: "分类修改成功~"})
      : handleError({message: "分类修改失败~"});
  }

  // 删除分类
  async delCategory(ctx) {
    const { category_id } = ctx.params;
    // delete category
    const deleteCategory = () => {
      return Category.findByIdAndRemove(category_id)
    }

    // delete pid
    const deletePid = category => {
      return new Promise((resolve, reject) => {
        Category.find({ parent: category_id })
          .then(categories => {
            // 如果没有子分类
            if (!categories.length) {
              return resolve(category)
            }
            // 否则更改父分类的子分类
            const targetCategory = Category.collection.initializeOrderedBulkOp()
            targetCategory
              .find({ _id: { $in: Array.from(categories, c => c._id) }})
              .update({ $set: { parent: category.parent || null }})
            targetCategory
              .execute((err, data) => {
                err ? reject(err) : resolve(category)
              })
          })
          .catch(err => reject(err))
      })
    }
    try {
      const category = await deleteCategory()
      await deletePid(category);
    } catch (err) {
      ctx.body = new Response().success("分类删除失败~")
    }
    ctx.body = new Response().success("分类删除成功~")
  }
}

module.exports = new CategoryController();

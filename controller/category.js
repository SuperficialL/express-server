/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-01 01:37:36
 * @Description: 分类路由控制器
 */
const Category = require("../models/Category");

class CategoryController {
  // 获取所有分类
  async getCategories(req, res) {
    await Category.find({})
      .populate({
        path: "parent"
      })
      .exec((err, categories) => {
        if (err) {
          return res.status(500).json({
            code: 1,
            message: "服务器内部错误~"
          });
        }
        if (categories) {
          return res.json({
            code: 0,
            message: "查询所有分类数据成功~",
            categories
          });
        }
      });
  }

  // 获取分类详情
  async getCategory(req, res) {
    const { id } = req.params;
    await Category.findById(id)
      .populate({
        path: "parent"
      })
      .exec((err, category) => {
        if (err) {
          return res.status(500).json({
            code: 1,
            message: "服务器内部错误~"
          });
        }
        if (category) {
          return res.json({
            code: 0,
            message: "查询分类详情数据成功~",
            category
          });
        } else {
          return res.json({
            code: 1,
            message: "分类数据不存在~"
          });
        }
      });
  }

  // 创建分类
  async createCategory(req, res) {
    const { name, parent } = req.body;
    if (!name) {
      res.json({
        code: 1,
        message: "分类名不可为空~"
      });
    }
    const data = parent
      ? {
          name,
          parent
        }
      : {
          name
        };
    await new Category(data).save(err => {
      if (err) {
        return res.status(500).json({
          code: 1,
          message: "服务器内部错误~"
        });
      }
      return res.status(201).json({
        code: 0,
        message: "分类创建成功~"
      });
    });
  }

  // 修改分类
  async updateCategory(req, res) {
    const { id } = req.params;
    const { ...update } = req.body;
    await Category.findByIdAndUpdate(id, update, (err, category) => {
      if (err) {
        return res.status(500).json({
          code: 1,
          message: "服务器内部错误"
        });
      }
      if (category) {
        return res.json({
          code: 0,
          message: "分类数据更新成功~"
        });
      } else {
        return res.json({
          code: 1,
          message: "分类数据不存在~"
        });
      }
    });
  }

  // 删除分类
  async delCategory(req, res) {
    const { id } = req.params;
    await Category.findByIdAndRemove(id).exec((err, category) => {
      if (err) {
        return res.status(500).json({
          code: 1,
          message: "服务器内部错误~"
        });
      }
      if (category) {
        return res.json({
          code: 0,
          message: "删除分类数据成功~"
        });
      } else {
        return res.json({
          code: 1,
          message: "分类数据不存在~"
        });
      }
    });
  }

  // 获取导航菜单
  async getMenu(req, res) {
    // const parent = await Category.find({
    //   parent: {
    //     $exists: true
    //   }
	// });
	// console.log(parent);
    await Category.aggregate([
    //   {
    //     $match: {
    //       parent: parent._id
    //     }
    //   },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "children"
        }
      }
    ]).exec((err, categories) => {
      if (err) {
        return res.status(500).json({
          code: 1,
          message: "服务器内部错误~"
        });
      }
      if (categories) {
        return res.json({
          code: 0,
		  message: "获取导航菜单数据成功~",
		  categories
        });
      } else {
        return res.json({
          code: 1,
          message: "获取导航菜单数据失败~"
        });
      }
    });
  }
}

module.exports = new CategoryController();

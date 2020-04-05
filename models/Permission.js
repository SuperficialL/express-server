/*
 * @Author: Superficial
 * @Date: 2020-03-25 17:39:41
 * @LastEditTime: 2020-03-25 18:53:03
 * @Description: 权限列表
 */

const { mongoose } = require("../core/db");

// 友链模型
const permmissionSchema = new mongoose.Schema(
  {
    // 权限名称
    name: { type: String, unique: true },

    // 权限方法
    method: { type: String, required: true },

    // 父级权限
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Permission" },

    // 版本号
    __v: { type: Number, select: false }
  }
);

permmissionSchema.virtual("children", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "Category"
});

// 友链模型
module.exports = mongoose.model("Permission", permmissionSchema);

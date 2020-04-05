/*
 * @Author: Superficial
 * @Date: 2020-03-09 13:24:50
 * @LastEditTime: 2020-03-25 18:51:32
 * @Description: 角色列表
 */


const { mongoose } = require("../core/db");

const roleSchema = new mongoose.Schema(
  {
    // 角色名
    name: { type: String, required: true },

    // 角色描述
    desc: { type: String, required: true },

    // 权限
    permissions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Permission" }],

    // 创建日期
    created_time: { type: Date, default: Date.now },

    // 最后修改日期
    updated_time: { type: Date, default: Date.now },

    // 版本号
    __v: { type: Number, select: false }
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time"
    }
  }
);

module.exports = new mongoose.model("roles", roleSchema);
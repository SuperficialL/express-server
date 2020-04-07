/*
 * @Author: Superficial
 * @Date: 2020-03-09 13:24:50
 * @LastEditTime: 2020-04-07 18:50:12
 * @Description: 角色列表
 */


const { mongoose } = require("../core/db");

const roleSchema = new mongoose.Schema(
  {
    // 角色名
    name: { type: String, required: true, unique: true },

    // 角色描述
    desc: { type: String, required: true },

    // 权限
    permissions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Permission" }],

    // 菜单
    menus: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Menu" }],

    // 版本号
    __v: { type: Number, select: false }
  }
);

module.exports = new mongoose.model("Role", roleSchema);
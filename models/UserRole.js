/*
 * @Author: Superficial
 * @Date: 2020-03-09 13:24:50
 * @LastEditTime: 2020-04-07 19:35:22
 * @Description: 用户角色列表
 */


const { mongoose } = require("../core/db");

const userRoleSchema = new mongoose.Schema(
  {
    // 用户
    user_id: { type: String, required: true },

    // 角色
    role_id: { type: String, required: true },

    // 版本号
    __v: { type: Number, select: false }
  }
);

module.exports = new mongoose.model("UserRole", userRoleSchema);
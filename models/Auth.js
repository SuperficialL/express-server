/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-04-07 19:42:42
 * @Description: 管理员模型
 */

const bcrypt = require("bcryptjs");
const { mongoose } = require("../core/db");

const adminSchema = new mongoose.Schema(
  {
    // 用户名
    username: { type: String, required: true },

    // 邮箱
    email: { type: String, required: true },

    // 一句话介绍
    headline: { type: String, default: "" },

    // 密码
    password: {
      type: String,
      required: true,
      select: false,
      set(val) {
        return bcrypt.hashSync(val, 10);
      }
    },

    // 头像
    avatar: { type: String },

    // 创建时间
    created_time: {
      type: Date,
      default: Date.now
    },

    // 修改日期
    updated_time: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time"
    }
  }
);

module.exports = mongoose.model("Auth", adminSchema);

/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-03-25 18:52:15
 * @Description: 用户模型
 */

const { mongoose } = require("../core/db");

const userSchema = new mongoose.Schema(
  {
    // 用户名
    username: { type: String, required: true },

    // 头像
    avatar: { type: String },

    // 邮箱
    email: { type: String, required: true },

    role: { type: mongoose.SchemaTypes.ObjectId, ref: "Role" },

    // 创建时间
    created_time: {
      type: Date,
      default: Date.now
    },

    // 修改日期
    updated_time: {
      type: Date,
      default: Date.now
    },

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

module.exports = mongoose.model("User", userSchema);

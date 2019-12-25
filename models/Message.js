/*
 * @Author: Superficial
 * @Date: 2019-12-25 16:08:01
 * @LastEditTime : 2019-12-25 16:13:57
 * @Description: 留言板模型
 */

const { mongoose } = require("../core/db");

const MessageSchema = new mongoose.Schema(
  {
    // 留言作者
    author: { type: String, required: true },

    // 留言内容
    content: { type: String, required: true },

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
  });

module.exports = mongoose.model("Message", MessageSchema);
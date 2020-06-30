/*
 * @Author: Superficial
 * @Date: 2020-02-28 16:25:35
 * @LastEditTime: 2020-02-28 18:59:51
 * @Description: 媒体库
 */

const { mongoose } = require("../core/mongodb");

const musicSchema = new mongoose.Schema(
  {
    // 音乐名称
    title: { type: String, required: true },

    // 音乐作者
    author: { type: String, required: true },

    // 音乐封面
    cover: { type: String },

    // 音乐地址
    url: { type: String, require: true },

    // 创建日期
    created_time: { type: Date, default: Date.now },

    // 最后修改日期
    updated_time: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time"
    }
  }
);

module.exports = mongoose.model("Music", musicSchema);
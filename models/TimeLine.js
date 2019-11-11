/*
 * @Author: Superficial
 * @Date: 2019-11-10 14:23:38
 * @LastEditTime: 2019-11-10 14:42:29
 * @Description: 时间轴
 */

const { mongoose } = require("../core/db");

const TimeLineSchema = new mongoose.Schema(
  {
    // 标题
    title: { type: String, required: true },

    // 描述
    description: { type: String, required: true },

    // 创建时间
    created_time: { type: Date, default: Date.now },

    // 更新时间
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
module.exports = mongoose.model("TimeLine", TimeLineSchema);

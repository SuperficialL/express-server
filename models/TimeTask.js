/*
 * @Author: Superficial
 * @Date: 2020-01-03 17:13:10
 * @LastEditTime : 2020-01-04 20:15:56
 * @Description: 任务模型
 */

const { mongoose } = require("../core/db");

const TimeTaskSchema = new mongoose.Schema(
  {
    // 任务名称
    name: { type: String, required: true },

    // 任务内容
    content: { type: String, required: true },

    // 定时任务时间
    time: { type: Date, required: true },

    // 任务状态
    status: { type: Boolean, required: true },

    // 创建日期
    created_time: { type: Date, default: Date.now },

    // 最后修改日期
    updated_time: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time"
    }
  }
);

module.exports = mongoose.model("TimeTask", TimeTaskSchema);
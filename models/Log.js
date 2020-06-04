/*
 * @Author: SuperficialL
 * @Date: 2020-05-14 10:46:10
 * @Description: 日志模型
 */

const { mongoose } = require("../core/db");

// 日志模型
const logSchema = new mongoose.Schema(
  {
    // 访问方法
    method: { type: String, required: true },

    // 访问地址
    address: { type: String, required: true },

    // 访问参数
    params: { type: Object, default: {} },

    // 查询参数
    query: { type: Object, default: {} },

    // 访问日期
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

// 日志模型
module.exports = mongoose.model("Log", logSchema);
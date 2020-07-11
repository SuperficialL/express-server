/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-07-11 18:01:27
 * @Description: 友链模型
 */

const mongoosePaginate = require("mongoose-paginate");
const autoIncrement = require("mongoose-auto-increment");
const { mongoose } = require("../core/mongodb");

// 友链模型
const linkSchema = new mongoose.Schema(
  {
    // 友链名称
    title: { type: String, required: true },

    // 友链地址
    address: { type: String, required: true },

    // 是否首页展示
    is_top: { type: Number, default: 0 },

    // 创建日期
    created_time: { type: Date, default: Date.now },

    // 最后修改日期
    updated_time: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time",
    },
  }
);

// 翻页 + 自增 ID 插件配置
linkSchema.plugin(mongoosePaginate);
linkSchema.plugin(autoIncrement.plugin, {
  model: "Link",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

// 友链模型
module.exports = mongoose.model("Link", linkSchema);

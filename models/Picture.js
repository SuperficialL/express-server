/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-05-14 10:20:30
 * @Description: 图片模型
 */
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('mongoose-auto-increment');
const { mongoose } = require("../core/db");

const pictureSchema = new mongoose.Schema(
  {
    // 图片标题
    name: { type: String, required: true, validate: /\S+/ },

    // 路径地址
    imageUrl: { type: String, required: true, validate: /\S+/ },

    // 图片大小
    size: { type: String, required: true },

    // 类型
    type: { type: String, required: true },

    // 类型
    key: { type: String, required: true },

    // 类型
    hash: { type: String, required: true },

    // 修改日期
    updated_time: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time"
    }
  }
);

// 翻页 + 自增 ID 插件配置
pictureSchema.plugin(mongoosePaginate);
pictureSchema.plugin(autoIncrement.plugin, {
  model: 'Picture',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model("Picture", pictureSchema);

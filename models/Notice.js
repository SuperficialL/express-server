/*
 * @Author: SuperficialL
 * @Date: 2020-05-14 10:46:10
 * @Description: 公告模型
 */

const { mongoose } = require("../core/mongodb");
const mongoosePaginate = require("mongoose-paginate");
const autoIncrement = require("mongoose-auto-increment");
const { PUBLISH_STATE } = require("../core/constants");

// 公告模型
const noticeSchema = new mongoose.Schema(
  {
    // 公告内容
    content: { type: String, required: true, validate: /\S+/ },

    // 公告发布状态 => 0 草稿，1 已发布
    status: { type: Number, default: PUBLISH_STATE.published },

    // 访问日期
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
noticeSchema.plugin(mongoosePaginate);
noticeSchema.plugin(autoIncrement.plugin, {
  model: "Notice",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

// 时间更新
noticeSchema.pre("findOneAndUpdate", function (next) {
  this.findOneAndUpdate({}, { updated_time: Date.now() });
  next();
});

// 公告模型
module.exports = mongoose.model("Notice", noticeSchema);

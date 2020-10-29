/*
 * @Author: Superficial
 * @Date: 2020-02-10 13:43:33
 * @LastEditTime: 2020-09-08 20:44:51
 * @Description: 问卷调查模型
 */
const mongoosePaginate = require("mongoose-paginate");
const autoIncrement = require("mongoose-auto-increment");
const { mongoose } = require("../core/mongodb");

const questionSchema = new mongoose.Schema(
  {
    // 姓名
    name: { type: String, required: true },

    // 性别
    sex: { type: String, required: true },

    // 手机号
    mobile: { type: String, required: true },

    // 年龄
    age: { type: String, required: true },

    // 是否做过
    work: { type: String, required: true },

    // 中介
    middleman: { type: String },

    // 想去的地方
    how: { type: String },

    // 评论日期
    created_time: { type: Date, default: Date.now },

    // 最后修改日期
    updated_time: { type: Date, default: Date.now }
  
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time",
    },
  }
);


// 翻页 + 自增 ID 插件配置
questionSchema.plugin(mongoosePaginate);
questionSchema.plugin(autoIncrement.plugin, {
  model: "Question",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Question", questionSchema);

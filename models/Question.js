/*
 * @Author: Superficial
 * @Date: 2020-02-10 13:43:33
 * @LastEditTime: 2020-09-08 20:44:51
 * @Description: 问卷调查模型
 */

const { mongoose } = require("../core/mongodb");

const questionSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Question", questionSchema);

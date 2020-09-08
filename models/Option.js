/*
 * @Author: Superficial
 * @Date: 2020-02-10 13:43:33
 * @LastEditTime: 2020-09-08 20:44:51
 * @Description: 网站设置模型
 */

const { mongoose } = require("../core/mongodb");

const optionSchema = new mongoose.Schema({
  // 网站标题
  title: { type: String, required: true },

  // 网站副标题
  sub_title: { type: String, required: true },

  // 关键字
  keywords: { type: String },

  // 网站描述
  description: { type: String },

  // 站点地址
  site_url: { type: String },

  // 网站官邮
  site_email: { type: String },

  // 备案号
  site_icp: { type: String },

  // 被喜欢次数
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Option", optionSchema);

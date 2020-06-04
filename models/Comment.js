/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-06-03 21:18:31
 * @Description: 评论模型
 */

const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('mongoose-auto-increment');
const { mongoose } = require("../core/db");
const { COMMENT_STATE, COMMENT_PARENT_TYPE } = require('../core/constants')

// 评论模型
const commentSchema = new mongoose.Schema(
  {
    // 第三方评论 ID
    third_id: { type: Number },

    // 评论所在的文章 ID，0 代表系统留言板
    article_id: { type: Number, required: true },

    // parent 代表默认留言
    parent: { type: Number, default: COMMENT_PARENT_TYPE.self },

    // 评论内容
    content: { type: String, required: true },

    // 是否置顶
    is_top: { type: Boolean, default: false },

    // 被赞数
    likes: { type: Number, default: 0 },

    // 评论产生者
    author: {
      name: { type: String, required: true, validate: /\S+/ },
      email: { type: String, required: true, validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ },
      site: { type: String, default: "" }
      // site: { type: String, validate: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ }
    },

    // IP地址
    ip: { type: String },

    // IP物理地址
    ip_location: { type: Object },

    // 用户UA
    agent: { type: String, validate: /\S+/ },

    // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
    status: { type: Number, default: COMMENT_STATE.published },

    // 评论日期
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

// 翻页 + 自增 ID 插件配置
commentSchema.plugin(mongoosePaginate);
commentSchema.plugin(autoIncrement.plugin, {
  model: 'Comment',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

// 标签模型
module.exports = mongoose.model("Comment", commentSchema);

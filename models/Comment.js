/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2020-02-10 14:20:46
 * @Description: 评论模型
 */

const { mongoose } = require("../core/db");

// 评论模型
const CommentSchema = new mongoose.Schema(
  {
    // 评论作者
    username: { type: String, required: true },

    // 邮箱
    email: { type: String, required: true },

    // 头像
    avatar: { type: String },

    // 评论内容
    content: { type: String, required: true },

    // 审核状态 0 待审核  1 审核完毕
    status: { type: Number, default: 0 },

    // 评论者站点
    site: { type: String },

    // 文章id
    article_id: { type: String, required: true },

    // 用户代理
    ua: { type: String },

    // 点赞数
    likes: { type: Number, default: 0 },

    // 评论日期
    created_time: { type: Date, default: Date.now },

    // 最后修改日期
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

// 标签模型
module.exports = mongoose.model("Comment", CommentSchema);

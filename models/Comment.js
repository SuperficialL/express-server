/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-11-10 16:01:51
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

    // 评论内容
    content: { type: String, required: true },

    // 状态
    // status: { type: Boolean, default: false },

    // 文章id
    article_id: { type: String, required: true },

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

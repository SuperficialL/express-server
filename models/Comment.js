/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-15 22:43:50
 * @Description: 评论模型
 */

const { mongoose } = require("../core/db");

// 评论模型
const CommentSchema = new mongoose.Schema(
  {
    // 评论作者
    name: { type: String, required: true },

    // 评论内容
    content: { type: String, required: true },

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

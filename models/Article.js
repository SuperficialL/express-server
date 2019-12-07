/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-12-07 11:06:53
 * @Description: 文章模型
 */

const { mongoose } = require("../core/db");

const ArticleSchema = new mongoose.Schema(
  {
    // 标题
    title: { type: String, required: true },

    // 分类
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category"
    },

    // 作者
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },

    // 缩略图
    thumbnail: { type: String },

    // 正文
    content: { type: String, required: true },

    // 解析后的html
    renderContent: { type: String, required: true },

    // 文章发布状态 => 0:草稿 1:发布
    status: { type: Number, default: 0 },

    // 标签
    tags: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tag"
      }
    ],

    // 评论
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment"
      }
    ],

    // 访问量
    views: { type: Number, default: 0 },

    likes: { type: Number, default: 0 },

    // 创建时间
    created_time: {
      type: Date,
      default: Date.now
    },

    // 修改日期
    updated_time: {
      type: Date,
      default: Date.now
    },

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

module.exports = mongoose.model("Article", ArticleSchema);

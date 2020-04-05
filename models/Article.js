/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-03-25 17:34:25
 * @Description: 文章模型
 */

const { mongoose } = require("../core/db");

const articleSchema = new mongoose.Schema(
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

    // 评论数据
    comments: { type: Number, default: 0 },

    // 访问量
    views: { type: Number, default: 0 },

    // 点赞数
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

// articleSchema.virtual("prev").get(function () {
//   // const prev_article = this.model.find();
//   // const prev_article = this.model.findOne({ _id: { "$lt": this._id } }).sort({ _id: -1 }).limit(1);
//   console.log(this);
//   return this._id;
// });

// articleSchema.set("toJSON", { getters: true, virtual: true });

articleSchema.post("findOne", async (doc) => {
  // this.views = this.views++;
  // console.log(doc.views);
  // console.log(this);
  // console.log(doc, "doc");
  // if (doc) {
  // doc.views++;
  // }
  // console.log(next);
  // this.findOne({}, { $set: { views: this.views++ } });
});

module.exports = mongoose.model("Article", articleSchema);

/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2019-12-28 22:25:02
 * @Description: 分类模型
 */
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('mongoose-auto-increment');
const { mongoose } = require("../core/mongodb");

const categorySchema = new mongoose.Schema(
  {
    // 分类名
    name: { type: String, required: true, validate: /\S+/ },

    // 别名
	  slug: { type: String, required: true, validate: /\S+/ },

    // 父级分类
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      default: null
    },

    // 图标
    icon: { type: String },

    // 创建时间
    created_time: {
      type: Date,
      default: Date.now
    },

    // 排序
    ordering: { type: Number, default: 0 },

    // 修改日期
    updated_time: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time"
    }
  }
);

// 翻页 + 自增 ID 插件配置
categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(autoIncrement.plugin, {
	model: 'Category',
	field: 'id',
	startAt: 1,
	incrementBy: 1
});

module.exports = mongoose.model("Category", categorySchema);

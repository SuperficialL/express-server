/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-09 21:58:26
 * @Description: 分类模型
 */

const { mongoose } = require("../core/db");

const CategorySchema = new mongoose.Schema({
	// 分类名
	name: {
		type: String,
		required: true
	},

	// 父级分类
	parent: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Category"
	},

	// 路径
	path: { type: String },

	// 图标
	icon: { type: String },

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
});

module.exports = mongoose.model("Category", CategorySchema);

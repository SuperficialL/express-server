/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-23 19:54:10
 * @Description: 分类模型
 */

const { mongoose } = require("../core/db");

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
	},
	parent: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Category",
	},
	path: { type: String },
	icon: { type: String },
	created_time: {
		type: Date,
		default: Date.now,
	},

	// 最后修改日期
	updated_time: {
		type: Date,
		default: Date.now,
	},

	// 版本号
	__v: { type: Number, select: false },
});

module.exports = mongoose.model("Category", CategorySchema);

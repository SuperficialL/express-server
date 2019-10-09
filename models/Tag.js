/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-10-09 21:45:53
 * @Description: 标签模型
 */

const { mongoose } = require("../core/db");

// 标签模型
const tagSchema = new mongoose.Schema({
	// 标签名称
	title: { type: String, required: true },

	// 创建日期
	created_time: { type: Date, default: Date.now },

	// 最后修改日期
	updated_time: { type: Date, default: Date.now },

	// 版本号
	__v: { type: Number, select: false }
});

// 标签模型
module.exports = mongoose.model("Tag", tagSchema);

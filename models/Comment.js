/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-27 21:44:45
 * @Description: 评论模型
 */

const { mongoose } = require("../core/db");

// 评论模型
const tagSchema = new mongoose.Schema({
	// 标签名称
	name: { type: String },

	// 发布日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now },
});

// 标签模型
module.exports = mongoose.model("Comment", tagSchema);

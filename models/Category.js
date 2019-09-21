/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 23:53:28
 * @Description: 分类模型
 */

const {mongoose} = require('../core/mongodb');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String 
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    },
    created_time: {
        type: Date,
        default: Date.now
    },

    // 最后修改日期
    updated_time: {
        type: Date,
        default: Date.now
    },

    // 版本号
    __v: { type: Number, select: false }
});

module.exports = mongoose.model('Category',CategorySchema);
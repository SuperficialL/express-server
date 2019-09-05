/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-27 21:41:10
 * @Description: 轮播模型
 */

const {mongoose} = require('../core/mongodb')

const schema = new mongoose.Schema({
    // 标题
    name: { type: String },
    items:[{
        image: { type: String },
        url: { type: String }
    }]
})

module.exports = mongoose.model('Banner',schema,'Banner')
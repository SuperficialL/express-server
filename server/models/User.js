/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-27 21:46:24
 * @Description: 管理员模型
 */

const {mongoose} = require('../core/mongodb')

const userSchema = new mongoose.Schema({
    // 用户名
    username: { type: String },
    // 密码
    password: { 
        type: String,
        select: true,
        set(val) {
            // 加密用户输入的密码
            return require('bcrypt').hashSync(val,10)
        }
    },
    // email
    email: { type: String },
    // 头像
    avatar: { type: String },
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
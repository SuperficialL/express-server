/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-27 21:46:24
 * @Description: 用户模型
 */

const bcrypt = require('bcrypt');
const {mongoose} = require('../core/mongodb');

const UserSchema = new mongoose.Schema({
    // 用户名
    username: { type: String, required: true },

    // 密码
    password: {
        type: String,
        required: true,
        select: true,
        set(val) {
           return bcrypt.hashSync(val,10);
        }
    },

    // 邮箱
    email: { type: String },

    // 头像
    avatar: { type: String },

    // 版本号
    __v: { type: Number, select: false }
});

module.exports = mongoose.model('User', UserSchema);
/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-07 13:52:33
 * @Description:  用户控制器
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
    // 登录
    async login(req,res) {
        let {username,password} = req.body;
        // 判断账号是否为空
        if (!username) {
            return res.json({
                code: 200,
                message: '账号不可为空～',
            });
        }

        // 判断密码是否为空
        if (!password) {
            return res.json({
                code: 200,
                message: '密码不可为空～',
            });
        }

        // 去除用户输入的不必要的空格
        username = username.trim();
        password = password.trim();

        const user = await User.findOne({username}).select('+password');
        if (user) {
            const isValid = bcrypt.compareSync(password, user.password);
            if (isValid) {
                const token = jwt.sign({
                    id: user._id,
                }, config.security.secretKey, {
                    expiresIn: config.security.expiresIn
                });
                return res.json({
                    code: 0,
                    message: '登录成功~',
                    token
                });
            } else {
                return res.json({
                    code: 1,
                    message: '密码错误~'
                })
            }
        } else {
            return res.json({
                code: 0,
                message: '用户不存在~'
            })
        }
    }

    // 注册
    async register(req,res) {
        const {username,password,password2} = req.body;
        // 用户账号为空
        if (!username) {
            return res.json({
                code: 400,
                message: '账号不可为空~',
            });
        }

        // 两次密码输入不正确
        if (!password || password !== password2) {
            return res.json({
                code: 400,
                message: '两次密码输入不正确~',
            });
        }
        await User.findOne({username}).exec((err,user) => {
            if (err) {
                return res.status(500).json({
                    code: 1,
                    message: "服务器内部错误~"
                })
            }
            if (user) {
                return res.json({
                    code: 1,
                    message: "用户已存在~"
                })
            } else {
                user = new User({
                    username,
                    password
                });
                user.save((err,doc) => {
                    if (err) {
                        return res.status(500).json({
                            code: 1,
                            message: err.message
                        })
                    }
                    if (doc) {
                        res.status(201).json({
                            code: 0,
                            message: "用户创建成功~"
                        })
                    }
                });
            }
        });
    }

    // 查询所有用户
    async getUserList(req,res) {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 10;
        const skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
        await User.countDocuments({}).exec((err,total) => {
            if (err) {
                return res.json({
                    code: 1,
                    message: '服务器内部错误~'
                })
            } else {
                User.find({}).skip(skip).limit(per_page).exec((err,users) => {
                    if (err) {
                        return res.json({
                            code: 1,
                            message: '服务器内部错误~'
                        })
                    }
                    if (users) {
                        return res.json({
                            code: 0,
                            message: '用户数据获取成功~',
                            users,
                            pagination: {
                                total,
                                page,
                                per_page,
                                pages: Math.ceil(total / per_page)
                            }
                        })
                    }
                });
            }
        });
    }

    // 查询单个用户
    async getUser(req,res) {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            return res.json({
                code: 0,
                message: '获取用户详情成功~',
                user
            })
        } else {
            return res.json({
                code: 1,
                message: '获取用户详情失败~'
            })
        }
    }

    // 删除用户
    async delUser(req,res) {
        const id = req.params.id;
        await User.findByIdAndDelete(id).exec((err,user) => {
            if (err) {
                return res.json({
                    code: 1,
                    message: '服务器内部错误~'
                })
            } else {
                if (user) {
                    return res.json({
                        code: 0,
                        message: '该用户删除成功~'
                    })
                } else {
                    return res.json({
                    code: 1,
                    message: '该用户不存在~'
                })
                }
                
            }
        })
    }

    // 修改用户信息
    async updateUser(req,res) {
        const {id} = req.params;
        const {...update} = req.body;
        const opt = {
            new: true, //  默认为false。返回修改后的数据。
        };
        await User.findByIdAndUpdate(id,update,opt).exec((err,user) => {
            if (err) {
                return res.status(500).json({
                    code: 1,
                    message: '服务器内部错误~'
                })
            } else {
                return res.json({
                    code: 0,
                    message: '用户信息修改成功~',
                    user
                })
            }
        });
    }

    // 修改密码
    async updatePassword(req,res) {
        const token = String(req.headers.authorization || '').split(' ').pop();
        const {id} = jwt.verify(token, config.security.secretKey);
        const {oldPassword, newPassword,newPassword2} = req.body;
        if (newPassword !== newPassword2) {
            return res.json({
                code: 1,
                message: '两次密码输入不正确~'
            })
        }
        const user = await User.findById(id).select('+password');
        const isValid = bcrypt.compareSync(oldPassword,user.password);
        if (isValid) {
            user.password = newPassword;
            user.save((err,user) => {
                if (err) {
                    return res.status(500).json({
                        code: 1,
                        message: err.message
                    })
                } else {
                    return res.json({
                        code: 0,
                        message: '修改密码成功~',
                        user
                    })
                }
            });
        } else {
            return res.json({
                code: 1,
                message: '密码验证不成功~'
            })
        }
    }
}

module.exports = new UserController;
/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-05 00:42:09
 * @Description:  用户增删改查
 */

const assert = require('http-assert');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/auth');

/**
 * @description: 登录处理
 * @param {username} string
 * @param {password} string
 * @return: token
 */

exports.login = async (req, res) => {
    let {
        username,
        password
    } = req.body;
    // 去除空格
    username = username.trim();
    password = password.trim();

    // 判断账号是否为空
    if (!username) {
        return res.status(400).json({
            code: 0,
            message: '账号不可为空~',
        });
    };

    // 判断密码是否为空
    if (!password) {
        return res.status(400).json({
            code: 0,
            message: '密码不可为空~',
        });
    }

    // 查找用户名是否存在
    await User.findOne(
        {username}, 
        (err, user) => {
        // 查询错误
        if (err) {
            return res.status(500).json({
                code: 0,
                message: err.message
            });
        } else {
            if (!user) {
                // 用户不存在
                return res.status(400).json({
                    code: 0,
                    message: '用户不存在!'
                });
            } else {
                // 用户存在验证密码
                const isValid = require('bcrypt').compareSync(password, user.password);
                if (isValid) {
                    // 验证密码是否正确
                    const token = jwt.sign({
                        id: user._id
                    }, config.security.secretKey,{
                        expiresIn: config.security.expiresIn
                    });
                    return res.json({
                        code: 1,
                        message: '登录成功~',
                        token
                    });
                } else {
                    return res.json({
                        code: 0,
                        message: '密码错误!'
                    });
                }
            }
        }
    })
}

/**
 * @description: 注册处理
 * @param {username} string
 * @param {password} string
 * @param {avatar} string
 * @param {email} string
 * @return: {code: 1(响应成功) | 0(响应失败)}
 */
exports.register = async (req, res) => {
    const {
        username,
        password,
        email,
        avatar
    } = req.body;
    // 用户账号为空
    if (!username) {
        return res.status(400).json({
            code: 0,
            message: '账号不可为空~',
        });
    };

    // 用户没有输入密码
    if (!password) {
        return res.status(400).json({
            code: 0,
            message: '密码不可为空~',
        });
    };

    // 查询
    await User.findOne({
        username
    }, (err, user) => {
        // 查询错误
        if (err) {
            return res.status(500).json({
                code: 0,
                message: err.message
            });
        } else {

        }

        if (!user) {
            // 用户不存在,可以注册
            user = new User({
                username,
                password,
                email,
                avatar
            });
            user.save();
            res.json({
                code: 1,
                message: '创建用户成功~'
            })
            return;
        } else {
            // 用户已存在
            return res.status(400).json({
                code: 0,
                message: '用户已存在~'
            });
        }
    })
}

/**
 * @description: 获取当前用户信息
 * @param {token} string
 * @return: 当前用户
 */
exports.profile = async (req, res) => {
    console.log(req);
    const token = String(req.headers.authorization || '').split(' ').pop();
    console.log(token);
    const {id} = jwt.verify(token, req.app.get('secret'));
    await User.find({_id: id}, {password: 0}).exec((err, user) => {
        if (err) {
            return res.json({
                code: 0,
                message: err.message
            })
        } else {
            if (user) {
                return res.json({
                    code: 1,
                    message: '获取用户信息成功~',
                    results: user[0]
                })
            } else {
                return res.json({
                    code: 0,
                    message: '获取用户信息失败~'
                })
            }
        }
    })
}

/**
 * @description: 获取所有用户
 * @param {page?} number 页码
 * @param {per_page?} number 每页显示数据条数
 * @return: data: {code:1|0,message:string,result?:[]}
 */
exports.getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 10;
    const skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page
    const data = {
        total: 0,
        page: page,
        pages: 0,
        per_page: per_page,
        results: []
    }
    await countDocuments({}, (err, total) => {
        if (err) {
            console.log('Error:' + err)
        } else {
            data.total = total
            data.pages = Math.ceil(total / per_page)
        }
    })
    data.results = await find().skip(skip).limit(per_page)
    res.json(data)
}



exports.getUser = async (req, res) => {
    const {
        id
    } = req.params;
    
    user = await findById(id)
    res.json(user)
}

exports.createUser = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    await User.findOne({
        username
    }, (err, user) => {
        if (err) {
            res.json({
                'code': 1,
                'message': err.message
            })
        } else {
            if (!user) {
                res.json({
                    'code': 1,
                    'message': '用户已存在,请登录!'
                });
            } else {
                user = new User({
                    username,
                    email,
                    password
                })
                user.save()
                res.json({
                    'code': 0,
                    'message': '用户创建成功~',
                    'userlist': user
                })
            }
        }
    })


}

exports.updateUser = async (req, res) => {
    const {
        id
    } = req.params
    const {
        username,
        email,
        password
    } = req.body
    findByIdAndUpdate(id, {
        username,
        email,
        password
    }, (err, user) => {
        if (err) {
            res.json({
                'code': 0,
                'message': err.message
            })
        } else {
            res.json({
                'code': 1,
                'message': '删除成功~',
            });
        }
    })
}

exports.deleteUser = async (req, res) => {
    const {
        id
    } = req.params
    findByIdAndDelete(id, (err, user) => {
        if (err) {
            res.json({
                'code': 0,
                'message': err.message
            })
        } else {
            res.json({
                'code': 1,
                'message': '删除成功~',
            });
        }
    })
}
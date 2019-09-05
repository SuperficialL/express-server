module.exports = options => {
    return async (req,res,next) => {
        /*
        登录验证中间件
        */
        const jwt = require('jsonwebtoken');
        const assert = require('http-assert');
        const User = require('../models/User');
        // 获取用户登录后生成的token
        const token = String(req.headers.authorization || '').split(' ').pop();
        // 验证token
        if (!token) {
            res.status(401).json({
                'code':1,
                'message': '请提供jwt token~',
            })
        }
        const { id } = jwt.verify(token,req.app.get('secret'));
        if (!id) {
            res.status(401).json({
                'code': 1,
                'message': '无效的jwt token~',
            })
        }
        // 查询用户是否伪造
        req.user = await User.findById(id)
        if (!req.user) {
            res.status(401).json({
                'code': 1,
                'message': '请先登录~',
            })
        }
        await next()
    }
}
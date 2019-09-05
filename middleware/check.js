/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 12:31:25
 * @Description: 检测token
 */
const Promise = require("bluebird");
const config = require('config-lite'); 
const jwt = require('jsonwebtoken'); 

module.exports = {
    /**
     * 设置token 创建token
     */
    setToken: function (payload) {
        // 24小时后
        const expiresIn = Date.now() + 24 * 60 * 60 * 1000;
        const token = jwt.sign(payload, config.token.secretOrPrivateKey, {
            expiresIn: expiresIn,
            // 设置过期时间
        });
        return {
            token: token,
            expiresIn: expiresIn,
        };
    },
    /**
     * 验证token是否正确：传入当前token和当前用户uuid
     */
    verifyToken: function (token, userUuid) {
        return new Promise(function (resolve, reject) {
            jwt.verify(token, config.token.secretOrPrivateKey, function (err, tokenData) {
                if (tokenData && tokenData.uuid == userUuid) {
                    resolve('ok');
                } else {
                    reject('fail');
                }
            });
        });
    },
    /**
     * 路由验证token
     */
    verifyRouterToken: function (req, res, next, isAdmin) {
        //accesstoken 被自动转小写了
        var token = req.headers.accesstoken;
        if (!token) { // 如果没有token，则返回错误
            res.json({
                code: "401",
            });
            return;
        } else { //验证token
            jwt.verify(token, config.token.secretOrPrivateKey, function (err, tokenData) {
                // 只有在token正确时tokenData有值
                if (err) {
                    res.json({
                        code: "402",
                    });
                    return;
                } else {
                    //验证是否为管理员
                    if (isAdmin && !tokenData.isAdmin) {
                        res.json({
                            code: "403",
                        });
                        return;
                    } else if (!isAdmin && tokenData.uuid && !tokenData.isAdmin) {
                        //验证userUuid 避免普通用户登录修改其他人资料
                        var userUuid = (req.body || req.query || req.params)['userUuid'];
                        if (userUuid && userUuid != tokenData.uuid) {
                            res.json({
                                code: "403",
                            });
                            return;
                        } else {
                            next();
                        }
                    } else {
                        next();
                    }
                }
            });
        }
    },
    /**
     * 清除token
     */
    delToken: function (token) {
        if (!token) {
            return 'delTokenFail';
        } else {
            jwt.decode(token);
            return 'delTokenSuccess';
        }
    },
};
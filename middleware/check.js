/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 12:31:25
 * @Description: 检测token
 */
const jwt = require('jsonwebtoken'); 

module.exports = {

    /**
     * @params {token}
     * @return user 当前用户
     */
    getCurUser() {
        
    },



    verifyToken: function (token) {
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
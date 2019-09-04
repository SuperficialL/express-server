/*
 * @Description: 配置
 * @Author: SuperficialL
 * @Date: 2019-09-04 22:59:01
 * @LastEditTime: 2019-09-05 00:30:05
 */

module.exports = {
    environment: 'dev',
    // mongo数据库
    mongo: {
        uri: `mongodb://127.0.0.1:27017/express`
    },
    // 安全相关配置
    security: {
        // 密钥
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 3
    }
}
 
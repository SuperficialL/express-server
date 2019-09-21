/*
 * @Description: 配置文件
 * @Author: SuperficialL
 * @Date: 2019-09-04 22:59:01
 * @LastEditTime: 2019-09-20 18:11:51
 */

module.exports = {
    environment: 'dev',
    // 端口
    port: 3000,
    // mongo数据库
    mongo: {
        uri: `mongodb://127.0.0.1:27017/express`
    },
    // 安全相关配置
    security: {
        // 密钥
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 60 * 60 * 24
    }
};
 
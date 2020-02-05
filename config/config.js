/*
 * @Author: SuperficialL
 * @Date: 2019-09-04 22:59:01
 * @LastEditTime : 2020-02-04 20:26:20
 * @Description: 配置文件
 */

module.exports = {
  environment: "dev",
  // 端口
  port: 3000,
  // mongo数据库
  mongo: {
    uri: "mongodb://127.0.0.1:27017/website"
  },
  // 安全相关配置
  security: {
    // 密钥
    secretKey: "secretKey",
    // 过期单位  s
    expiresIn: 60 * 60 * 24
  },
  // 微信公众号
  wechat: {
    appID: "wx6fea9efb92e74fa7",
    appsecret: "c91f3e210177118685a56fda4b8e41a5",
    token: "wx6fea9efb92e74fa7"
  }
};

/*
 * @Author: SuperficialL
 * @Date: 2019-09-04 22:59:01
 * @LastEditTime: 2019-10-02 14:24:48
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
  }
};

/*
 * @Author: SuperficialL
 * @Date: 2019-09-04 22:59:01
 * @LastEditTime: 2020-03-02 13:17:38
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
  },
  // 邮件发送者
  mail: {
    host: "smtp.163.com",
    sender: "15871930413@163.com",
    pass: "zrui950312"
  },
  qiniu: {
    accessKey: "6lEYwVPcfmNGYBMWqgKZXl-isn80eojd1x7squfm",
    secretKey: "Wol1jwZwhIW8qx4dJHlG3ctJJbVV9Ek6w0TMfu3t",
    bucket: "periodical"
  }
};

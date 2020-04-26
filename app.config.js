/*
 * @Author: SuperficialL
 * @Date: 2019-09-04 22:59:01
 * @LastEditTime: 2020-03-02 13:17:38
 * @Description: 配置文件
 */
const package = require("./package.json");
// const environment = process.env.NODE_ENV;
const environment = "development";
const isDevMode = Object.is(environment, "development");
const isProdMode = Object.is(environment, "production");

module.exports = {
  environment: environment,
  isDevMode,
  isProdMode,

  INFO: {
    name: package.name,
    version: package.version,
    author: package.author,
    site: "http://www.zhangwurui.net",
    github: "https://github.com/surmon-china",
    powered: ["Vue", "Nuxt.js", "Bootstrap", "Nodejs", "MongoDB", "Express", "Nginx"]
  },

  SESSION_CONFIG: {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: false, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
  },

  // 端口
  port: 3000,

  // mongo数据库
  MONGODB: {
    limit: 16,
    // uri: "mongodb://127.0.0.1:27017/website",
    uri: "mongodb://Superficial:.zrui.950312@49.233.165.116:27017/website?authSource=admin",
    username: "Superficial",
    password: ".zrui.950312"
  },

  // 跨域
  CROSS_DOMAIN: {
    allowedOrigins: ["http://zhangwurui.net", "http://cdn.zhangwurui.net", "http://admin.zhangwurui.net"],
    allowedReferer: "zhangwurui.net"
  },
  
  // 安全相关配置
  SECURITY: {
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

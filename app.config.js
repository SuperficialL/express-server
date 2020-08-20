/*
 * @Author: SuperficialL
 * @Date: 2019-09-04 22:59:01
 * @LastEditTime: 2020-08-18 20:57:41
 * @Description: 配置文件
 */
const path = require("path");
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
    powered: [
      "Vue",
      "Nuxt.js",
      "Bootstrap",
      "Nodejs",
      "MongoDB",
      "Express",
      "Nginx",
    ],
  },

  APP: {
    NAME: "个人博客",
    URL: "http://www.zhangwurui.net",
    // 端口
    PORT: 3000,
    FRONT_END_PATH: isDevMode
      ? path.join(__dirname, "..", "nuxt-web")
      : path.join(__dirname, "../../", "nuxt-web/current"),
  },

  // mongo数据库
  MONGODB: {
    limit: 16,
    // uri: "mongodb://127.0.0.1:27017/website",
    uri:
      "mongodb://Superficial:.zrui.950312@49.233.165.116:27017/website?authSource=admin",
    username: "Superficial",
    password: ".zrui.950312",
  },

  // 跨域
  CROSS_DOMAIN: {
    allowedOrigins: [
      "http://zhangwurui.net",
      "http://cdn.zhangwurui.net",
      "http://admin.zhangwurui.net",
    ],
    allowedReferer: "zhangwurui.net",
  },

  BAIDU: {
    site: "www.zhangwurui.net",
    token: "PdtIgAM22ycFgJL0",
  },

  // 安全相关配置
  SECURITY: {
    // 密钥
    secretKey: "secretKey",
    // 过期单位  s
    expiresIn: 60 * 60 * 24,
  },

  // 邮件发送者
  EMAIL: {
    host: "smtp.163.com",
    sender: "15871930413@163.com",
    user: "347106739@qq.com",
    password: "zrui950312",
  },
  qiniu: {
    accessKey: "6lEYwVPcfmNGYBMWqgKZXl-isn80eojd1x7squfm",
    secretKey: "Wol1jwZwhIW8qx4dJHlG3ctJJbVV9Ek6w0TMfu3t",
    media_bucket: "periodical",
    pic_bucket: "statices",
  },
  JHApi: {
    key: "8d3aff4ed1531e65c3ba3414309dd843",
  },
};

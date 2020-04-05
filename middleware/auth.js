/*
 * @Author: Superficial
 * @Date: 2019-10-02 02:04:35
 * @LastEditTime: 2020-03-04 17:38:07
 * @Description: 认证中间件
 */

const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const config = require("../config/config");

const auth = async (ctx, next) => {
  // 设置白名单
  if (ctx.url.match(/^\/api\/admin\/(.*)/)) {
    const whiteList = ["/api/admin/login", "/api/admin/register", "/api/admin/captcha", "/api/admin/saveQiNiuUrl"];
    if (!whiteList.includes(ctx.url)) {
      const token = String(ctx.headers.authorization || "")
        .split(" ")
        .pop();
      const { id } = jwt.verify(token, config.security.secretKey);
      if (id) {
        ctx.id = id;
      }
    }
  }
  await next();
};

const chatAuth = async (ctx, next) => {
  const { signature, nonce, timestamp, echostr } = ctx.query;
  let str = [config.wechat.token, timestamp, nonce].sort().join("");
  const sha = sha1(str);
  if (sha === signature) {
    ctx.body = echostr;
  } else {
    ctx.body = {
      message: "微信认证失败",
      code: 500
    };
  }
  await next();
};

module.exports = { auth, chatAuth };

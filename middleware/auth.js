/*
 * @Author: Superficial
 * @Date: 2019-10-02 02:04:35
 * @LastEditTime: 2019-11-12 23:17:48
 * @Description: 认证中间件
 */

const jwt = require("jsonwebtoken");
const config = require("../config/config");

const auth = async (ctx, next) => {
  // 设置白名单
  if (ctx.url.match(/^\/api\/admin\/(.*)/)) {
    const whiteList = ["/api/admin/login", "/api/admin/register"];
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

module.exports = auth;

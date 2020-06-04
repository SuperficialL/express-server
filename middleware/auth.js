/*
 * @Author: Superficial
 * @Date: 2019-10-02 02:04:35
 * @LastEditTime: 2020-05-14 14:59:05
 * @Description: 认证中间件
 */

const jwt = require("jsonwebtoken");
const CONFIG = require("../app.config");

// 验证 Auth
const authToken = req => {
  if (!req.headers || !req.headers.authorization) {
    return false;
  }
  const parts = req.headers.authorization.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
};

// 验证权限
const authIsVerified = req => {
  const token = authToken(req);
  if (token) {
    try {
      const decodedToken = jwt.verify(token, CONFIG.SECURITY.secretKey);
      return (decodedToken.exp > Math.floor(Date.now() / 1000));
    } catch (err) {
      return false;
    }
  }
  return false;
};

module.exports = authIsVerified;

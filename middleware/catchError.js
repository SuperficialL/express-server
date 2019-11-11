/*
 * @Author: Superficial
 * @Date: 2019-09-30 12:51:23
 * @LastEditTime: 2019-11-09 23:35:45
 * @Description: 全局异常处理
 */
const { HttpException } = require("../core/http-exception");

const test = async (ctx, next) => {
  try {
    await next();
    // 处理404页面
    if (ctx.status === 404) {
      ctx.body = {
        code: 404,
        message: "你需要的页面已经上天了~"
      };
    }
  } catch (error) {
    if (error instanceof HttpException) {
      // 处理已知错误
      ctx.status = error.code;
      ctx.body = {
        code: error.code,
        message: error.message,
        errorCode: error.errorCode
      };
    } else {
      // token 签名过期
      if (error.name === "TokenExpiredError") {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: error.message
        };
      } else if (error.name === "JsonWebTokenError") {
        // token 无效
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: error.message
        };
      } else if (error.name === "ValidationError") {
        // 参数验证失败
        ctx.status = 400;
        ctx.body = {
          code: 400,
          message: error.message
        };
      } else {
        // 服务器内部错误
        console.log(error);
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: "服务器内部错误"
        };
      }
    }
  }
};

module.exports = test;

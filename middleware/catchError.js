/*
 * @Author: Superficial
 * @Date: 2019-09-30 12:51:23
 * @LastEditTime: 2019-10-04 12:50:21
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
      // 处理未知错误
      if (error.name === "TokenExpiredError") {
        ctx.body = {
          code: 422,
          message: error.message
        };
        ctx.status = 422;
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: "服务器内部错误",
          stack: error
        };
      }
    }
  }
};

module.exports = test;

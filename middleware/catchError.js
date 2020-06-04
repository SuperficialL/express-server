/*
 * @Author: Superficial
 * @Date: 2019-09-30 12:51:23
 * @LastEditTime: 2020-05-14 10:52:42
 * @Description: 全局异常处理
 */
const { HttpException } = require("../core/http-exception");

const catchError = async (ctx, next) => {
  try {
    await next();
    // 处理 404 页面
    if (ctx.status === 404) {
      ctx.body = {
        code: 404,
        message: "无效的API请求~"
      };
    }
  } catch (err) {
    ctx.body = err;
  }
};

module.exports = catchError;

/*
 * @Author: SuperficialL
 * @Date: 2019-09-04 21:49:02
 * @LastEditTime: 2019-10-03 19:00:24
 * @Description: 错误异常类型
 */

class HttpException extends Error {
  constructor(errorCode, message = '服务器内部异常~', code = 200) {
    super();
    this.errorCode = errorCode;
    this.message = message;
    this.code = code;
  }
}

module.exports = {
  HttpException
};

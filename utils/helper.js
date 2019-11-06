/*
 * @Author: Superficial
 * @Date: 2019-10-02 01:27:18
 * @LastEditTime: 2019-10-15 21:05:12
 * @Description: 响应工具类
 */

class Response {
  success(message = "响应成功~", errorCode = 0, code = 200) {
    return {
      code,
      errorCode,
      message
    };
  }

  error(message = "响应成功~", errorCode = 0, code = 200) {
    return {
      code,
      errorCode,
      message
    };
  }

  json(data, message = "响应成功~", errorCode = 0, code = 200) {
    return {
      code,
      errorCode,
      message,
      data
    };
  }
}

module.exports = Response;

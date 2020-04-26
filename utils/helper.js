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

  json(results, message = "响应成功~", errorCode = 0, code = 200) {
    return {
      code,
      errorCode,
      message,
      ...results
    };
  }
}

// 处理成功
const handleSuccess = ({ result = null, message = '请求成功' }) => {
  return { code: 1, message, result };
}

// 处理错误
const handleError = ({ err = null, message = '请求失败', code }) => {
  return { code, message }
}

// 处理翻页数据
const handlePaginateData = data => ({
	data: data.docs,
	pagination: {
		total: data.total,
		page: data.page,
		total_page: data.pages,
		per_page: data.limit
	}
})

module.exports = { Response, handlePaginateData, handleSuccess, handleError };

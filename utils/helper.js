/*
 * @Author: Superficial
 * @Date: 2019-10-02 01:27:18
 * @LastEditTime: 2020-05-14 15:17:33
 * @Description: 响应工具类
 */

// 处理成功
const handleSuccess = ({ res, result = null, message = "请求成功" }) => {
  res.jsonp({ code: 1, message, result });
}

// 处理错误
const handleError = ({ res, err = null, message = "请求失败", code }) => {
  const json = { code: 0, message, debug: err }
  code ? res.status(code).jsonp(json) : res.jsonp(json)
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

module.exports = { handlePaginateData, handleSuccess, handleError };

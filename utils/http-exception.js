/*
 * @Author: SuperficialL
 * @Date: 2019-09-07 13:17:52
 * @LastEditTime: 2019-09-07 13:50:02
 * @Description: 响应工具函数
 */

 module.exports = {
    responseClient(res, code = 200, errorCode = 500, message='服务端异常',data) {
        let responseData = {};
        responseData.message = message;
        responseData.errorCode = errorCode;
        responseData.data = data;
        return res.status(code).json(responseData);
    }
 }
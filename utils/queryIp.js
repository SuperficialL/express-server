/*
 * @Author: SuperficialL
 * @Date: 2020-05-31 18:49:17
 * @LastEditTime: 2020-05-31 19:19:54
 * @Description: ip地址查询
 * @FilePath: \blog\node-server\utils\queryIp.js
 */

const superagent = require("superagent");
const JHApi = require("../app.config").JHApi;

const queryIp = (ip) => {
  return superagent
    .post("http://apis.juhe.cn/ip/ipNew")
    .query({ ip: ip, key: JHApi.key })
}

module.exports = queryIp;
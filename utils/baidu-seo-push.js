/*
 * @Author: Superficial
 * @Date: 2019-10-02 01:27:18
 * @LastEditTime: 2020-08-16 17:17:32
 * @Description: 百度SEO提交
 */

const request = require("request");
const consola = require("consola");
const CONFIG = require("../app.config");

// POST request
const postRequest = ({ urls, urlKey, msg }) => {
  request.post(
    {
      body: urls,
      headers: { "Content-Type": "text/plain" },
      url: `http://data.zz.baidu.com/${urlKey}?site=${CONFIG.BAIDU.site}&token=${CONFIG.BAIDU.token}`,
    },
    (error, response, body) => {
      consola.info(urls, msg, error, body);
    }
  );
};

// 提交记录
const baiduSeoPush = (urls) => {
  consola.log("百度推送：", urls);
  postRequest({ urls, urlKey: "urls", msg: "百度推送结果：" });
};

// 更新记录
const baiduSeoUpdate = (urls) => {
  consola.log("百度更新：", urls);
  postRequest({ urls, urlKey: "update", msg: "百度更新结果：" });
};

// 删除记录
const baiduSeoDelete = (urls) => {
  consola.log("百度删除：", urls);
  postRequest({ urls, urlKey: "del", msg: "百度删除结果：" });
};

module.exports = {
  baiduSeoPush,
  baiduSeoUpdate,
  baiduSeoDelete,
};

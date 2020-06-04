 /*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-05-14 18:10:55
 * @Description: 网站地图控制器
 */

const redis = require("./core/redis");
const updateAndBuildSiteMap = require("../utils/sitemap");
const { REDIS_CACHE_FIELDS } = require("../core/constants");
const { buildController, initController, humanizedHandleError } = require("../core/processor");

// controller
const SiteMapCtrl = initController();

// 获取地图
SiteMapCtrl.GET = (req, res) => {
  redis.promise({
    key: REDIS_CACHE_FIELDS.sitemap,
    promise: updateAndBuildSiteMap
  })
    .then(xml => {
      res.header("Content-Type", "application/xml");
      res.send(xml)
    })
    .catch(humanizedHandleError(res, "获取地图失败"))
};

module.exports = buildController(SiteMapCtrl);

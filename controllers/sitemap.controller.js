/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-08-17 00:32:45
 * @Description: 网站地图控制器
 */
const {
  buildController,
  initController,
  handleSuccess,
  handleError,
} = require("../core/processor");
const updateAndBuildSiteMap = require("../utils/sitemap");

// controller
const SiteMapCtrl = initController();
// let sitemap;

// 获取地图
SiteMapCtrl.GET = (req, res) => {
  try {
    updateAndBuildSiteMap();
    handleSuccess({ res, message: "生成站点地图成功~" });
  } catch (e) {
    handleError({ res, message: "生成站点地图错误~" });
  }
};

module.exports = buildController(SiteMapCtrl);

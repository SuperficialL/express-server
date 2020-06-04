 /*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-05-14 18:10:55
 * @Description: 七牛控制器
 */

const qiniu = require("qn");
const CONFIG = require("../app.config");
const { buildController, initController, handleSuccess } = require("../core/processor");

const client = qiniu.create(CONFIG.QINIU);
const QiniuCtrl = initController();

// 获取配置列表
QiniuCtrl.GET = (req, res) => {
	const result = { upToken: client.uploadToken() };
  handleSuccess({ res, result, message: "upToken 获取成功" });
}

module.exports = buildController(QiniuCtrl);

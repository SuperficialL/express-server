/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-09-08 20:38:30
 * @Description: 设置控制器
 */

const Option = require("../models/Option");

const {
  humanizedHandleError,
  humanizedHandleSuccess,
  buildController,
  initController,
} = require("../core/processor");

// controller
const OptionCtrl = initController();

// 获取设置
OptionCtrl.GET = (req, res) => {
  Option.findOne({})
    .then(humanizedHandleSuccess(res, "配置项获取成功"))
    .catch(humanizedHandleError(res, "配置项获取失败"));
};

// 修改设置
OptionCtrl.PATCH = ({ body: option, body: { _id } }, res) => {
  console.log(option, "option");
  // 如果 _id 是 null 或空值
  if (!_id) {
    Reflect.deleteProperty(option, "_id");
  }

  const optionService = _id
    ? Option.findByIdAndUpdate(_id, option, { new: true })
    : new Option(option).save();
  optionService
    .then(humanizedHandleSuccess(res, "配置项修改成功"))
    .catch(humanizedHandleError(res, "配置项修改失败"));
};

module.exports = buildController(OptionCtrl);

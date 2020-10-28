/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-09-08 20:38:30
 * @Description: 设置控制器
 */

const Question = require("../models/Question");

const {
  humanizedHandleError,
  humanizedHandleSuccess,
  buildController,
  initController,
} = require("../core/processor");

// controller
const QuestionCtrl = initController();

// 问卷获取
QuestionCtrl.GET = (req, res) => {
  Question.find()
    .then(humanizedHandleSuccess(res, "问卷获取成功"))
    .catch(humanizedHandleError(res, "问卷获取失败"));
};

// 新增问卷
QuestionCtrl.POST = ({ body: question }, res) => {
  console.log(question,"question");
  new Question(question).save()
    .then(humanizedHandleSuccess(res, "问卷新增成功"))
    .catch(humanizedHandleError(res, "问卷新增失败"));
};

module.exports = buildController(QuestionCtrl);

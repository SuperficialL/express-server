/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-09-08 20:38:30
 * @Description: 设置控制器
 */

const Question = require("../models/Question");

const {
  handlePaginateData,
  handleSuccess,
  humanizedHandleError,
  humanizedHandleSuccess,
  buildController,
  initController,
} = require("../core/processor");

const { numberIsInvalid } = require("../utils/tools");

// controller
const QuestionCtrl = initController();

// 问卷获取
QuestionCtrl.GET = (req, res) => {
  const [page, per_page] = [
    req.query.page || 1,
    req.query.per_page || 8,
  ].map((k) => Number(k));

  // 过滤条件
  const options = {
    page
  };
  if (!numberIsInvalid(per_page)) {
    options.limit = per_page;
  }

  const query = {};

  Question.paginate(query, options)
    .then((questions) => {
      handleSuccess({
        res,
        result: handlePaginateData(questions),
        message: "问卷列表获取成功",
      });
    })
    .catch(humanizedHandleError(res, "问卷列表获取失败~"));
};

// 新增问卷
QuestionCtrl.POST = ({ body: question }, res) => {
  console.log(question,"question");
  new Question(question).save()
    .then(humanizedHandleSuccess(res, "问卷新增成功"))
    .catch(humanizedHandleError(res, "问卷新增失败"));
};

module.exports = buildController(QuestionCtrl);

/*
 * @Author: Superficial
 * @Date: 2020-01-03 17:35:22
 * @LastEditTime: 2020-05-31 12:08:52
 * @Description: 定时任务工具函数
 */

const schedule = require("node-schedule");

/**
 * @description: 判断文件夹是否存在 如果不存在则创建文件夹
 * @param {} String
 * @return null
 */

const setTask = function (date) {
  schedule.scheduleJob(date, function () {
  });
};

const cancelTask = function (job) {
  // 取消任务
  job.cancel();
};



module.exports = { setTask, cancelTask };
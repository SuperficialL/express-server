/*
 * @Author: Superficial
 * @Date: 2019-11-06 23:12:10
 * @LastEditTime: 2019-11-06 23:29:24
 * @Description: 工具函数
 */
const fs = require("fs");

/**
 * @description: 按时间生成文件夹名
 * @param {type} null
 * @return {String} dir
 */
function getUploadDirName() {
  const date = new Date();
  let month = Number.parseInt(date.getMonth() + 1);
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
}

/**
 * @description: 判断文件夹是否存在 如果不存在则创建文件夹
 * @param {dir} String
 * @return null
 */
function checkDirExist(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

/**
 * @description: 获取文件后缀依靠的是 file.name 属性，通过原始文件名获取到后缀
 * @param {name} String
 * @return: name
 */
function getUploadFileExt(name) {
  let ext = name.split(".");
  return ext[ext.length - 1];
}

module.exports = {
  getUploadDirName,
  checkDirExist,
  getUploadFileExt
};

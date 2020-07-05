/*
 * @Author: Superficial
 * @Date: 2019-11-06 23:12:10
 * @LastEditTime: 2020-07-05 23:45:32
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


const isArray = array => Array.isArray(array);

const isString = string => typeof string === 'string';

// 数组是否无效
const arrayIsInvalid = array => !array || !array.length;

// 检查数字是否无效
const numberIsInvalid = number => number === null || number === undefined || isNaN(number);

// 数组去重
const arrayUniq = (a, b = []) => [...new Set([...a, ...b])];

// 获取对象值数组
const objectValues = object => Object.keys(object).map(key => object[key]);

module.exports = {
  getUploadDirName,
  checkDirExist,
  getUploadFileExt,
  isArray,
  isString,
  arrayUniq,
  objectValues,
  arrayIsInvalid,
  numberIsInvalid
};

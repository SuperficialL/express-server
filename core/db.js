/*
* @Author: SuperficialL
* @Date: 2019-09-04 21:49:02
 * @LastEditTime: 2020-05-18 14:28:49
* @Description: 数据库模块
 */

const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { success, error } = require("consola");
const { MONGODB } = require("../app.config");

// remove DeprecationWarning
mongoose.set("useFindAndModify", false);

mongoose.Promise = global.Promise;

// 导出数据库
exports.mongoose = mongoose;

// 导出连接
exports.connect = () => {
  // 连接数据库
  mongoose.connect(MONGODB.uri, {
    useCreateIndex: true,
    // 防止控制台出现警告
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
  });
  // 连接错误
  mongoose.connection.on("error", err => {
    error("数据库连接失败!", err);
  });

  // 连接成功
  mongoose.connection.once("open", () => {
    success("数据库连接成功!");
  });

  // 自增 ID 初始化
  autoIncrement.initialize(mongoose.connection);

  // 返回实例
  return mongoose;
};

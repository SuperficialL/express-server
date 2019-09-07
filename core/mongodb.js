/*
 * @Description: 数据库模块
 * @Author: SuperficialL
 * @Date: 2019-09-04 21:49:02
 * @LastEditTime: 2019-09-07 12:17:19
 */

const mongoose  = require('mongoose');
const consola = require('consola');
const config = require('../config/config');

// remove DeprecationWarning
mongoose.set('useFindAndModify',false)

mongoose.Promise = global.Promise

// 导出数据库
exports.mongoose = mongoose

// 导出连接

exports.connect = () => {
    // 连接数据库
    mongoose.connect(config.mongo.uri, {
        useCreateIndex: true,
        // 防止控制台出现警告
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    })
    // 连接错误
    mongoose.connection.on('error', error => {
		consola.error('数据库连接失败!', error)
	})

	// 连接成功
	mongoose.connection.once('open', () => {
		consola.success('数据库连接成功!')
	})
	
	// 返回实例
	return mongoose
}
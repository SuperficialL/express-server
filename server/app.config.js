/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 11:55:26
 * @Description: 配置文件
 */

const path  = require('path');

exports.MONGODB = {
    // uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/express`,
    uri: `mongodb://127.0.0.1:27017/express`,
	// username: argv.db_username || 'DB_username',
	// password: argv.db_password || 'DB_password',
}
/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-08 12:46:07
 * @Description: 入口文件
 */

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const consola = require('consola');
const expressJwt = require('express-jwt');
const config = require('./config/config');
const mongodb = require('./core/mongodb');
const authMiddleware = require('./middleware/auth');
const admin_route = require('./routes/admin');
// const web_route = require('./routes/web');

const app = express();

// 打印日志
app.use(logger('dev'));

// 跨域
app.use(cors());

// 传输json数据
app.use(express.json());

app.use('/admin',
expressJwt({secret: config.security.secretKey}).unless({
        path: ['/admin/login','/admin/register']
    })
)

// 静态文件托管
// app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use('/admin',express.static(__dirname + '/admin'));

// 错误处理
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        'code': 0,
        'message': err.message
    });
    next();
});

// 连接数据库
mongodb.connect();

// 路由
admin_route(app);
// web_route(app);

app.listen(config.port,() => {
    consola.ready(`服务运行在 http://127.0.0.1:${config.port}`)
});
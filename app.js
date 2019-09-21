/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-21 15:20:16
 * @Description: 入口文件
 */

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { ready } = require('consola');
const jwt = require('express-jwt');
const expressJwt = require('express-jwt');
const config = require('./config/config');
const mongodb = require('./core/mongodb');
const admin_route = require('./routes/admin');
const system_route = require('./routes/dev');

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
);

app.use('/System',
    jwt({secret: config.security.secretKey}).unless({
        path: ['/admin/login','/admin/register']
    })
);

// 静态文件托管
app.use('/views',express.static(__dirname + '/admin'));

// 连接数据库
mongodb.connect();

// 路由
admin_route(app);

// 公司路由
system_route(app);


// 错误处理
app.use((req, res) => {
    return res.status(404).json({
        code: 0,
        message: '页面不存在~',
        // errUrl: req.originalUrl
    });
});

// // 错误处理
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        code: 0,
        message: err.message
    });
});

app.listen(config.port,() => {
    ready(`服务运行在 http://127.0.0.1:${config.port}`)
});
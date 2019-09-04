/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-05 00:29:51
 * @Description: 入口文件
 */

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const jwt = require('express-jwt');
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
    jwt({secret: config.security.secretKey}).unless({
        path: ['/admin/login','/admin/register']
    })
)

// app.use('/admin',async(req,res,next) => {
//     if (req.url  === '/login' || req.url  === '/register') {
//         await next();
//     } else {
//         const token = String(req.headers.authorization || '').split(' ').pop();
//         // 验证token
//         if (!token) {
//             return res.status(401).json({
//                 'code':0,
//                 'message': '请提供jwt token~',
//             });
//         }
//         const { id } = jwt.verify(token,req.app.get('secret'));
//         if (!id) {
//             return res.status(401).json({
//                 'code': 0,
//                 'message': '无效的jwt token~',
//             });
//         }
//         // 查询用户是否伪造
//         req.user = await User.findById(id)
//         if (!req.user) {
//             res.status(401).json({
//                 'code': 0,
//                 'message': '请先登录~',
//             })
//         }
//         await next()
//     }
// });

// 静态文件托管
// app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use('/admin',express.static(__dirname + '/admin'));

// 错误处理
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        'code': 0,
        'message': err.message
    })
});

// 连接数据库
mongodb.connect();

// 路由
admin_route(app);
// web_route(app);

app.listen(3000,() => {
    console.log('http://127.0.0.1:3000')
});
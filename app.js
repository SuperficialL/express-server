/*
 * @Author: Superficial
 * @Date: 2019-09-30 12:46:53
 * @LastEditTime: 2019-10-03 17:19:43
 * @Description: App入口文件
 */

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const mongodb = require('./core/db');
const catchError = require('./middleware/catchError');
const InitManager = require('./core/init');
const auth = require('./middleware/auth');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(catchError);
// 全局异常处理

app.use(cors());

app.use(auth);

// 连接数据库
mongodb.connect();

app.use(koaBody());

InitManager.init(app);

app.listen(3000, () => {
  console.log(' App 运行在 http://127.0.0.1:3000');
});

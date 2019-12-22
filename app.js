/*
 * @Author: Superficial
 * @Date: 2019-09-30 12:46:53
 * @LastEditTime : 2019-12-18 19:28:15
 * @Description: App入口文件
 */

const Koa = require("koa");
const compress = require("koa-compress");
const path = require("path");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const cors = require("@koa/cors");
const mongodb = require("./core/db");
const catchError = require("./middleware/catchError");
const InitManager = require("./core/init");
const auth = require("./middleware/auth");
const { checkDirExist, getUploadDirName } = require("./utils/tools");

const app = new Koa();
const options = { threshold: 2048 };
app.use(compress(options));

// 连接数据库
mongodb.connect();

// 跨域
app.use(cors());

// 日志中间件
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 静态服务中间件
app.use(koaStatic(path.join(__dirname, "/public")));

// 全局异常处理
app.use(catchError);

// 认证
app.use(auth);

// 设置文件上传处理路径
app.use(
  koaBody({
    // 支持文件
    multipart: true,
    formidable: {
      // 上传文件位置
      uploadDir: path.join(__dirname, "/public/uploads"),
      // 保留上传文件后缀名
      keepExtensions: true,
      onFileBegin: (name, file) => {
        // 最终要保存到的文件夹目录
        const dirName = getUploadDirName();
        const dir = path.join(__dirname, `public/uploads/${dirName}`);
        // 检查文件夹是否存在如果不存在则新建文件夹
        checkDirExist(dir);
        // 重新覆盖file.path属性
        file.path = `${dir}/${file.name}`;
        file.filePath = `${getUploadDirName()}/${file.name}`;
      }
    }
  })
);

InitManager.init(app);

app.listen(3000, () => {
  console.log("App 运行在 http://127.0.0.1:3000");
});

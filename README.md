# 服务端(koa-server)

> 该项目使用 `koa2` 开发,采用 `mongodb` 数据库

## 目前实现的功能

[√] 管理员模块

[√] 分类模块

[√] 标签模块

[√] 文章模块

[√] 评论模块

[√] 轮播模块

[√] 友链模块

[√] 时间线模块

[√] 留言板模块

[√] 站点模块

# 如何使用该项目

## 安装 mongo 数据库(如果已安装,请跳过该步骤)

> windows 下安装

```bash
# 直接在浏览器地址栏中输入该网址会直接进行下载
https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.2-signed.msi

# 也可以自己在浏览器中进入 mongo 官网进行下载
https://www.mongodb.com/download-center/community
```

> linux 下安装(这里使用的是 `ubuntu` 系统)

```bash
# 这种安装比较简单,没有设置mongo账户的用户密码,和数据存储位置
sudo apt-get mongo
```

## 克隆项目代码

```bash
git clone https://github.com/SuperficialL/koa-server.git
```

## 进入 koa 项目根目录

```bash
cd koa-server
```

## 安装

```bash
yarn or npm install
```

## 运行服务

```bash
yarn serve or npm run server
```

> notice: npm 包 `bcrypt` window 安装可能回报错,所以我更换成了 `bcryptjs`, `bcrypt`或者`bcryptjs`都是可以使用了,想使用那个就安装哪个即可

```bash
# windows系统下
yarn add bcryptjs

# linux系统下
yarn add bcrypt
```

## 打开浏览器输入回车`http://localhost:3000`

## 想和后台管理界面结合请访问`https://github.com/SuperficialL/blog-admin.git`

## 想和前端界面结合请访问`https://github.com/SuperficialL/blog-web.git`

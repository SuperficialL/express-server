/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-11-13 22:40:47
 * @Description:  用户控制器
 */

const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const config = require("../config/config");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const { HttpException } = require("../core/http-exception");
const Response = require("../utils/helper");

class UserController {
  // 登录
  async login(ctx) {
    let { username, password } = ctx.request.body;

    // 判断账号是否为空
    if (!username) throw new HttpException(20001, "账号不可为空~");
    if (!password) throw new HttpException(20002, "密码不可为空~");

    const user = await Admin.findOne({ username }).select("+password");

    if (!user) throw new HttpException(40003, "用户不存在~");

    const isValid = user && bcrypt.compareSync(password, user.password);

    if (!isValid) throw new HttpException(20003, "密码验证不正确~");

    const token =
      isValid &&
      jwt.sign({ id: user._id }, config.security.secretKey, {
        expiresIn: config.security.expiresIn
      });
    ctx.body = new Response().json({ token }, "用户登录成功~");
  }

  // 注册
  async register(ctx) {
    const { username, email, password, password2 } = ctx.request.body;
    if (!username) throw new HttpException(20001, "账号不可为空~");
    if (!password || password !== password2)
      throw new HttpException(200, "两次密码输入不正确~");

    const user = await Admin.findOne({ email });

    if (user) throw new HttpException(40004, "用户已存在~");
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    await new Admin({ username, email, password, avatar }).save();
    ctx.body = new Response().success("用户注册成功~");
    ctx.status = 201;
  }

  // 获取管理员信息
  async profile(ctx) {
    const user = await Admin.findById(ctx.id, { password: 0 });
    ctx.body = new Response().json({ user }, "用户信息获取成功~");
  }

  // 修改管理员信息
  async updateAdmin(ctx) {
    const id = ctx.id;
    const { ...data } = ctx.request.body;
    await Admin.findByIdAndUpdate(id, data, {
      new: true,
      fields: { password: 0 }
    });
    ctx.body = new Response().success("管理员信息修改成功~");
  }

  // 获取所有用户
  async getUsers(ctx) {
    const users = await Admin.find();
    const total = await Admin.countDocuments();
    ctx.body = new Response().json({ users, total });
  }

  // 获取单个用户
  async getUser(ctx) {
    const { id } = ctx.params;
    const user = await Admin.findById(id);
    ctx.body = new Response().json({ user });
  }

  // 删除用户
  async delUser(ctx) {
    const { id } = ctx.params;
    const user = await Admin.findByIdAndRemove(id);
    ctx.body = user
      ? new Response().success("用户删除成功~")
      : new Response().success("用户删除失败~");
  }
}

module.exports = new UserController();

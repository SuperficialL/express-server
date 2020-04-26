/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-04-07 19:40:44
 * @Description:  用户控制器
 */

const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const svgCaptcha = require("svg-captcha");
const { SECURITY } = require("../app.config");
const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const { HttpException } = require("../core/http-exception");
const { handleSuccess, handleError } = require("../utils/helper");
const { authIsVerified } = require("../middleware/auth");
class AuthCtrl {
  // 登录
  async login(ctx) {
    let { username, password, code } = ctx.request.body;
    // if (code || (code.toLowerCase() !== ctx.session.verifCode)) throw handleError({code: 422, message: "验证码错误~"})
    // 判断账号是否为空
    if (!username) throw new HttpException(20001, "账号不可为空~");
    if (!password) throw new HttpException(20002, "密码不可为空~");

    const user = await Auth.findOne({ username }).select("+password");
    if (!user) throw new HttpException(40003, "用户不存在~");

    const isValid = user && bcrypt.compareSync(password, user.password);

    if (!isValid) throw new HttpException(20003, "账号或密码验证不正确~");

    const token =
      isValid &&
      jwt.sign({ id: user._id }, SECURITY.secretKey, {
        expiresIn: SECURITY.expiresIn
      });
    ctx.body = handleSuccess({ result:{ token }, message:"用户登录成功~"});
  }

  // 注册管理员
  async register(ctx) {
    const { username, email, password, password2 } = ctx.request.body;
    if (!username) throw new HttpException(20001, "账号不可为空~");
    if (!password || password !== password2)
      throw new HttpException(200, "两次密码输入不正确~");

    const user = await Auth.findOne({ email });
    if (user) throw new HttpException(40004, "用户已存在~");
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    await new Auth({ username, email, password, avatar }).save();
    ctx.status = 201;
    ctx.body = handleSuccess({ message:"用户注册成功~"});
  }

  // 获取管理员信息
  async profile(ctx) {
    const { id } = ctx.state;
    const user = await Auth.findById(id, { password: 0 });
    ctx.body = handleSuccess({result:user, message:"用户信息获取成功~"});
  }

  // 修改管理员信息
  async updateAuth(ctx) {
    const id = ctx.id;
    const { ...data } = ctx.request.body;
    await Auth.findByIdAndUpdate(id, data, {
      new: true,
      fields: { password: 0 }
    });
    ctx.body = new Response().success("管理员信息修改成功~");
  }

  // 获取验证码
  async generateVerifCode(ctx) {
    const captcha = svgCaptcha.create({
      size: 4,
      width: 160,
      height: 36,
      ignoreChars: "0oO1i",
      noise: 2,
      color: true,
      background: "rgba(0,0,0,0.1)"
    });
    const { data, text } = captcha;
    console.log(text.toLowerCase(),"ss");
    ctx.session.verifCode = text.toLowerCase();
    ctx.body = handleSuccess({
      result: data,
      code: 1,
      message: "验证码获取成功~"
    });
  }
}

module.exports = new AuthCtrl();

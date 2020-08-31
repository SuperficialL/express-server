/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-08-26 16:44:28
 * @Description:  用户控制器
 */

const jwt = require("jsonwebtoken");
// const svgCaptcha = require("svg-captcha");
const { SECURITY } = require("../app.config");
const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const authIsVerified = require("../middleware/auth");
const { handleError,
  handleSuccess,
  humanizedHandleError,
  buildController,
  initController } = require("../core/processor");

const AuthCtrl = initController();

// 获取个人信息
AuthCtrl.GET = (req, res) => {
  Auth.find({}, "-_id username avatar email")
    .then(([result = {}]) => {
      handleSuccess({ res, result, message: "用户资料获取成功" })
    })
    .catch(humanizedHandleError(res, "用户资料获取失败"))
};

// 生成登录令牌
AuthCtrl.POST = ({ body: { username, password } }, res) => {
  Auth.find({ username }, "-_id +password")
    .then(([auth]) => {
      const isValid = auth && bcrypt.compareSync(password, auth.password);
      if (isValid) {
        const token = jwt.sign({
          username: auth.username,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, SECURITY.secretKey);
        handleSuccess({ res, result: { token }, message: "登陆成功" });
      } else {
        handleError({ res, message: "来者何人!" });
      }
    })
    .catch(humanizedHandleError(res, "登录失败"));
};

// 检查令牌有效性
AuthCtrl.PATCH = (req, res) => {
  authIsVerified(req)
    ? handleSuccess({ res, result: true, message: 'Token 验证成功' })
    : handleError({ res, result: false, code: 403, message: 'Token 验证不通过!' })
};

// 修改权限和个人信息
AuthCtrl.PUT = ({ body: auth }, res) => {
  // 初始化
  let { password, new_password, rel_new_password } = auth;

  // 密码解码
  // password = decodePassword(password)
  // new_password = decodePassword(new_password)
  // rel_new_password = decodePassword(rel_new_password)

  // 验证密码
  if (password || new_password || rel_new_password) {
    if ((!new_password || !rel_new_password) || new_password !== rel_new_password) {
      return handleError({ res, message: '密码不一致或无效' })
    }
    if ([new_password, rel_new_password].includes(password)) {
      return handleError({ res, message: '新旧密码不可一致' })
    }
  }

  // 修改前查询验证
  Auth.find({}, '_id username avatar password')
    .then(([auth]) => {
      const isValid = auth && bcrypt.compareSync(password, auth.password);
      if (isValid) {
        return handleError({ res, message: '原密码不正确' });
      }
      (auth._id
        ? Auth.findByIdAndUpdate(auth._id, auth, { new: true })
        : new Auth(auth).save()
      )
        .then(({ name, avatar } = auth) => {
          handleSuccess({ res, result: { name, avatar }, message: '用户权限修改成功' });
        })
        .catch(humanizedHandleError(res, '用户权限修改失败'))
    }).catch(humanizedHandleError(res, '用户权限修改失败'))
};

module.exports = buildController(AuthCtrl);

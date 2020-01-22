/*
 * @Author: Superficial
 * @Date: 2020-01-22 09:34:52
 * @LastEditTime : 2020-01-22 14:14:07
 * @Description: 验证码接口
 */
const svgCaptcha = require("svg-captcha");

class Captcha {
  async create(ctx) {
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
    ctx.body = {
      captcha: data,
      text: text.toLowerCase(),
      code: 200
    };
  }
}


module.exports = new Captcha();
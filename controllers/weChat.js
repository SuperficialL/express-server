/*
 * @Author: Superficial
 * @Date: 2019-12-23 23:27:49
 * @LastEditTime : 2019-12-23 23:44:09
 * @Description: 微信公众号控制器
 */
const sha1 = require("sha1");
const { token } = require("../config/config").wechat;

class WeChatController {
  async getToken(ctx) {
    console.log(ctx.query);
    const { signature, nonce, timestamp, echostr } = ctx.query;
    let str = [token, timestamp, nonce].sort().join("");
    const sha = sha1(str);
    if (sha === signature) {
      ctx.body = echostr + "";
    } else {
      ctx.body = "wrong";
    }
  }
}
module.exports = new WeChatController();

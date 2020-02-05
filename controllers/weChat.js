/*
 * @Author: Superficial
 * @Date: 2019-12-23 23:27:49
 * @LastEditTime : 2020-02-05 09:32:13
 * @Description: 微信公众号控制器
 */
const sha1 = require("sha1");
const { token } = require("../config/config").wechat;

class WeChatController {
  // 验证服务器有效性
  async validateServer(ctx) {
    const { signature, nonce, timestamp, echostr } = ctx.query;
    let str = [token, timestamp, nonce].sort().join("");
    const sha = sha1(str);
    if (sha === signature) {
      ctx.body = echostr;
    } else {
      ctx.status = 401;
      ctx.body = {
        message: "Invalid signature",
        code: 401
      };
    }
  }
}
module.exports = new WeChatController();

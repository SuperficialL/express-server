/*
 * @Author: Superficial
 * @Date: 2019-10-28 17:46:31
 * @LastEditTime: 2020-03-05 10:08:55
 * @Description: 文件上传
 */
const qiniu = require("qiniu");
const { accessKey, secretKey, bucket } = require("../config/config").qiniu;

class FileController {
  async uploadImg(ctx) {
    const file = ctx.request.files.file;
    ctx.body = {
      url: `/uploads/${file.filePath}`,
      code: 200
    };
  }

  async uploadQiNiu(ctx) {
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let options = {
      scope: bucket,
      // returnBody: "{\"key\":\"$(key)\",\"hash\":\"$(etag)\",\"fsize\":\"$(fsize)\",\"bucket\":\"$(bucket)\",\"name\":\"$(x:name)\"}"

    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    putPolicy.callbackUrl = "http://chat.free.idcfengye.com/api/admin/saveQiNiuUrl";
    putPolicy.callbackBody = "{\"key\":\"$(key)\",\"hash\":\"$(etag)\",\"fsize\":\"$(fsize)\",\"bucket\":\"$(bucket)\",\"name\":\"$(x:name)\"}";
    putPolicy.callbackBodyType = "application/json";
    let uploadToken = putPolicy.uploadToken(mac);
    if (uploadToken) {
      ctx.body = {
        token: uploadToken,
        code: 200
      };
    } else {
      ctx.body = {
        error: "错误",
        code: 401
      };
    }
  }

  async deleteImg(ctx) {
    const file = ctx.request.files.file;
    ctx.body = {
      url: `/uploads/${file.filePath}`,
      code: 200
    };
  }

  async saveQiNiuUrl(ctx) {
    console.log(ctx, "ctx");
    ctx.body = {
      code: 200
    };
  }
}

module.exports = new FileController();

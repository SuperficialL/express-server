/*
 * @Author: Superficial
 * @Date: 2019-10-28 17:46:31
 * @LastEditTime: 2019-11-06 23:29:31
 * @Description: 文件上传
 */
const path = require("path");

class FileController {
  async uploadImg(ctx) {
    const file = ctx.request.files.file;
    const baseUrl = path.basename(file.path);
    ctx.body = {
      url: `${ctx.origin}/uploads/${baseUrl}`
    };
  }
}

module.exports = new FileController();

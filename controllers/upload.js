/*
 * @Author: Superficial
 * @Date: 2019-10-28 17:46:31
 * @LastEditTime : 2019-12-18 19:35:39
 * @Description: 文件上传
 */
// const path = require("path");

class FileController {
  async uploadImg(ctx) {
    const file = ctx.request.files.file;
    // const baseUrl = path.basename(file.path);
    console.log(file.filePath, "file");
    ctx.body = {
      url: `/uploads/${file.filePath}`
    };
  }
}

module.exports = new FileController();

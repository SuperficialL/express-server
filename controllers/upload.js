/*
 * @Author: Superficial
 * @Date: 2019-10-28 17:46:31
 * @LastEditTime : 2020-01-13 17:46:32
 * @Description: 文件上传
 */

class FileController {
  async uploadImg(ctx) {
    const file = ctx.request.files.file;
    ctx.body = {
      url: `/uploads/${file.filePath}`,
      code: 200
    };
  }

  async deleteImg(ctx) {
    const file = ctx.request.files.file;
    ctx.body = {
      url: `/uploads/${file.filePath}`,
      code: 200
    };
  }
}

module.exports = new FileController();

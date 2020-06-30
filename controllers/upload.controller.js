/*
 * @Author: SuperficialL
 * @Date: 2019-10-28 17:46:31
 * @LastEditTime: 2020-06-29 22:41:18
 * @Description: 文件上传
 */
const { handleSuccess } = require("../core/processor");

module.exports = (req, res) => {
  const url = req.file.originalname || req.filename;
  handleSuccess({ res, result: { url: `/uploads/${url}` }, message: "上传成功~" });
}

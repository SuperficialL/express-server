/*
 * @Description: Do not edit
 * @Author: superficial
 * @Date: 2019-09-07 01:32:22
 * @LastEditTime: 2019-09-21 15:17:32
 */

class FileUpload {
    async file(req,res) {
        const file = req.file;
        file.url = `/uploads/${file.filename}`;
        res.send(file);
    }
}

module.exports = new FileUpload();
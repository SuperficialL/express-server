/*
 * @Author: Superficial
 * @Date: 2020-01-23 16:44:06
 * @LastEditTime : 2020-01-28 18:56:47
 * @Description: 邮件发送
 */

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.163.com",
  // port: 465,
  secure: true,
  auth: {
    user: "15871930413@163.com",
    // pass: "dhyjsknbzdhfcaga"
    pass: "zrui950312"
  }
});


function SendMail(callback) {
  let mailOptions = {
    from: "15871930413@163.com",
    to: "347106739@qq.com",
    subject: "欢迎评论SuperficialL Blog",
    text: "",
    html: ""
  };
  console.log(transporter, "transporter");
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

module.exports = { SendMail };

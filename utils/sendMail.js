/*
 * @Author: Superficial
 * @Date: 2020-01-23 16:44:06
 * @LastEditTime: 2020-02-27 10:46:46
 * @Description: 邮件发送
 */

const nodemailer = require("nodemailer");
const { host, sender, pass } = require("../config/config").mail;

const transporter = nodemailer.createTransport({
  host,
  secure: true,
  auth: {
    user: sender,
    pass
  }
});


function SendMailToAuthor(opts, callback) {
  let mailOptions = {
    from: "15871930413@163.com",
    to: "347106739@qq.com",
    subject: "欢迎评论SuperficialL Blog",
    text: opts.content,
    html: ""
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

function SendMailToComment(opts, callback) {
  let mailOptions = {
    from: "15871930413@163.com",
    to: opts.email,
    subject: "欢迎评论SuperficialL Blog",
    text: opts.content,
    html: ""
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

module.exports = { SendMailToAuthor, SendMailToComment };

/*
 * @Author: Superficial
 * @Date: 2020-01-23 16:44:06
 * @LastEditTime: 2020-06-03 22:44:54
 * @Description: 邮件发送
 */

const consola = require("consola");
const nodemailer = require("nodemailer");
const CONFIG = require("../app.config");


let clientIsValid = false;

const transporter = nodemailer.createTransport({
  host: CONFIG.EMAIL.host,
  secure: true,
  port: 465,
  auth: {
    user: CONFIG.EMAIL.sender,
    pass: CONFIG.EMAIL.password
  }
});

const verifyClient = () => {
  transporter.verify((error, success) => {
    if (error) {
      clientIsValid = false;
      consola.warn("邮件客户端初始化连接失败，将在一小时后重试");
      setTimeout(verifyClient, 1000 * 60 * 60)
    } else {
      clientIsValid = true;
      consola.ready("邮件客户端初始化连接成功，随时可发送邮件")
    }
  })
};

verifyClient();

const sendMail = mailOptions => {
  if (!clientIsValid) {
    consola.warn("由于未初始化成功，邮件客户端发送被拒绝");
    return false
  }
  mailOptions.from = CONFIG.EMAIL.sender;
  transporter.sendMail(mailOptions, (error, info) => { 
    if (error) {
      consola.warn("邮件发送失败", error)
    } else {
      consola.success("邮件发送成功", info.messageId, info.response)
    }
  })
};

module.exports = { sendMail };

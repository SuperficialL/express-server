/*
 * @Author: Superficial
 * @Date: 2020-02-05 09:48:49
 * @LastEditTime: 2020-04-06 10:13:46
 * @Description: Do not edit
 */

const { writeFile, readFile } = require("fs");
const request = require("request-promise-native");
const { appID, appsecret } = require("../config/config").wechat;

class WeChat {
  constructor() { }

  getAccessToken() {
    // 获取access_token
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`;
    return new Promise((resolve, reject) => {
      request({ method: "GET", url, json: true })
        .then(res => {
          res.expires_in = Date.now() + (res.expires_in - 300);
          resolve(res);
        })
        .catch(err => {
          reject("getAccessToken" + err);
        });
    });
  }

  readAccessToken() {
    return new Promise((resolve, reject) => {
      readFile("../config/access_token.txt", (err, data) => {
        if (!err) {
          console.log("文件读取成功~");
          JSON.parse(data);
          resolve(data);
        } else {
          reject("readAccessToken" + err);
        }
      });
    });
  }

  saveAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      writeFile("../config/access_token.txt", JSON.stringify(accessToken), err => {
        if (!err) {
          console.log("文件保存成功~");
          resolve();
        } else {
          reject("saveAccessToken" + err);
        }
      });
    });
  }

  isValidAccessToken(data) {
    if (!data && data.accessToken && data.expires_in) {
      return false;
    }
    return data.expires_in > Date.now();
  }

  fetchAccessToken() {
    new Promise((resolve, reject) => {
      this.readAccessToken()
        .then(async res => {
          if (this.isValidAccessToken(res)) {
            resolve(res);
          } else {
            const res = await this.getAccessToken();
            await this.saveAccessToken(res);
            resolve(res);
          }
        })
        .catch(async err => {
          global.log(err);
          const res = await this.getAccessToken();
          await this.saveAccessToken(res);
          reject(res);
        })
        .then(res => {
          this.access_token = res.access_token;
          this.expires_in = res.expires_in;
        });
    });
  }
}


// module.exports = new WeChat();

const w = new WeChat();

w.fetchAccessToken();


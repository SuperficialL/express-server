/*
 * @Author: Superficial
 * @Date: 2019-09-30 16:26:42
 * @LastEditTime: 2019-10-02 15:28:38
 * @Description: 初始化配置
 */

const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static init(app) {
    InitManager.app = app;
    InitManager.loadRouters();
  }

  static loadRouters() {
    const apiDirectory = `${process.cwd()}/routes`;
    requireDirectory(module, apiDirectory, {
      visit: loadRouter
    });
    function loadRouter(router) {
      if (router instanceof Router) {
        InitManager.app.use(router.routes());
        InitManager.app.use(router.allowedMethods());
      }
    }
  }
}

module.exports = InitManager;

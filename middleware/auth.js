/*
 * @Author: Superficial
 * @Date: 2019-10-02 02:04:35
 * @LastEditTime: 2020-03-04 17:38:07
 * @Description: 认证中间件
 */

const jwt = require("jsonwebtoken");
const { SECURITY } = require("../app.config");

// 验证 Auth
const authToken = ctx => {
	if (!ctx.headers || !ctx.headers.authorization) {
		return false
	}
  const parts = ctx.headers.authorization.split(" ")
	if (parts.length === 2 && parts[0] === "Bearer") {
		return parts[1]
	}
}

// 验证权限
const authIsVerified = ctx => {
  const token = authToken(ctx);
	if (token) {
		try {
      const { id,exp } = jwt.verify(token, SECURITY.secretKey);
      ctx.state.id = id;
			return (exp > Math.floor(Date.now() / 1000));
		} catch (err) {
			return false;
		}
	}
	return false;
}

const hasAuth = async (ctx, next) => {
  const isPostUrl = (ctx, url) => Object.is(ctx.url, url) && Object.is(ctx.method, "POST");
  const isLike = isPostUrl(ctx, '/api/like');
  const isPostAuth = isPostUrl(ctx, '/api/auth');
  const isPostComment = isPostUrl(ctx, '/api/comment');
  const isPostRegister = isPostUrl(ctx, '/api/register');

  const notGetRequest = ctx.method !== "GET";
  const isGuestRequest = !authIsVerified(ctx);
  console.log(isGuestRequest,'isGuestRequest');
  if (isLike || isPostAuth || isPostComment || isPostRegister) {
    // 判断请求登录, 点赞, 评论不需要认证
    await next();
  } else if (isGuestRequest && notGetRequest) {
    // 拦截所有非 GET 请求
    ctx.status = 401;
    ctx.body = { code: 0, message: '来者何人！' };
  } else {
    await next();
  }
};

module.exports = { hasAuth, authIsVerified };

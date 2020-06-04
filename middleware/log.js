/*
 * @Author: SuperficialL
 * @Date: 2020-05-14 10:56:55
 * @Descripttion: 日志中间件
 */

const log = async (ctx, next) => {
    const { headers, query, params, ip } = ctx;
    const forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    let ipAddress = forwardedIpsStr ? forwardedIpsStr : null;
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms - ${ipAddress} - ${ip}`);
}

module.exports = log;

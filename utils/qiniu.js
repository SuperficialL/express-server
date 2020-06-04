const qiniu = require("qiniu");
const { accessKey, secretKey } = require("../app.config").qiniu;
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

function asyncQiNiuList(bucket) {
    let list = [];
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    let option = { limit: 20 };
    return new Promise((resolve, reject) => {
        bucketManager.listPrefix(bucket, option, (respErr, respBody, respInfo) => {
            if (respBody.error) {
                respErr = { "error": respBody.error, 'status': respBody.status };
            }
            if (respBody) {
                resolve(respBody);
            } else {
                reject(respInfo);
            }
        })
    });
}

function asyncQiNiuToken(bucket) {
    // 创建上传凭证前定义鉴权对象mac
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    // 创建上传凭证
    const options = {
        scope: bucket,
        returnBody: `{ "key": $(key),"name":$(fprefix), "hash": $(etag), "size":$(fsize),"type":$(mimeType) }`
    }
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    return uploadToken;
}


module.exports = { asyncQiNiuList, asyncQiNiuToken };
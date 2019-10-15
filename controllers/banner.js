/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 14:42:04
 * @Description: 文章控制器
 */

const Banner = require("../models/Banner");

class BannerController {
    // 查询所有轮播属性
    async getBanners(req, res) {
        let { page = 1, per_page = 10 } = req.query;
        let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
        await Banner.find({})
            .skip(skip)
            .limit(per_page)
            .exec((err, banners) => {
                if (err) {
                    return res.status(500).json({
                        code: 1,
                        message: "服务器内部错误~"
                    });
                } else {
                    return res.json({
                        code: 0,
                        message: "获取轮播数据成功~",
                        banners,
                        pagination: {
                            page,
                            per_page
                        }
                    });
                }
            });
    }
}

module.exports = new BannerController();

exports.getBanners = async (req, res) => {
    const banners = await Banner.find();
    res.json(banners);
};

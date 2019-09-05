const  Banner = require('../../models/Banner')

exports.getBanners = async(req,res) => {
    banners = await Banner.find()
    res.json(banners)
}

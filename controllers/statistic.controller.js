/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-07-27 15:03:59
 * @Description: 统计控制器
 */

// const schedule = require("node-schedule");
// const redis = require("../core/redis");
const { REDIS_CACHE_FIELDS } = require("../core/constants");
const { handleSuccess } = require("../core/processor");

const Article = require("../models/Article");
const Tag = require("../models/Tag");
const Comment = require("../models/Comment");
const Category = require("../models/Category");
const resultData = {};

// const getTags = () => redis.get(REDIS_CACHE_FIELDS.tags).then(tags => {
//   resultData.tags = tags.docs.length
// });

// const getViews = () => redis.get(REDIS_CACHE_FIELDS.todayViews).then(views => {
//   resultData.views = views || 0
// });
const getCategories = () => Category.countDocuments({}, (err, count) => {
  resultData.categories = count;
});

const getTags = () => Tag.countDocuments({}, (err, count) => {
  resultData.tags = count;
});

const getArticles = () => Article.countDocuments({}, (err, count) => {
  resultData.articles = count;
});

const getComments = () => Comment.countDocuments({}, (err, count) => {
  resultData.comments = count;
});

// schedule.scheduleJob("1 0 0 * * *", () => {
//   redis.set(REDIS_CACHE_FIELDS.todayViews, 0)
// });

// 获取基本的统计数据
module.exports = (req, res) => {
  Promise.all([
    getCategories(),
    getTags(),
    // getViews(),
    getComments(),
    getArticles()
  ]).then(_ => {
    handleSuccess({
      res,
      message: "统计数据获取成功",
      result: resultData
    })
  })
};

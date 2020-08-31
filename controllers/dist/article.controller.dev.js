"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 * @author: Superficial
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-08-26 23:42:57
 * @Description: 文章控制器
 */
var Article = require("../models/Article");

var Tag = require("../models/Tag");

var Category = require("../models/Category");

var authIsVerified = require("../middleware/auth");

var _require = require("../utils/tools"),
    numberIsInvalid = _require.numberIsInvalid,
    arrayIsInvalid = _require.arrayIsInvalid,
    objectValues = _require.objectValues;

var _require2 = require("../core/constants"),
    PUBLISH_STATE = _require2.PUBLISH_STATE,
    PUBLIC_STATE = _require2.PUBLIC_STATE,
    ORIGIN_STATE = _require2.ORIGIN_STATE,
    SORT_TYPE = _require2.SORT_TYPE,
    REDIS_CACHE_FIELDS = _require2.REDIS_CACHE_FIELDS;

var _require3 = require("../core/processor"),
    handleError = _require3.handleError,
    handleSuccess = _require3.handleSuccess,
    humanizedHandleError = _require3.humanizedHandleError,
    handlePaginateData = _require3.handlePaginateData,
    buildController = _require3.buildController,
    initController = _require3.initController;

var updateAndBuildSiteMap = require("../utils/sitemap");

var _require4 = require("../utils/baidu-seo-push"),
    baiduSeoPush = _require4.baiduSeoPush,
    baiduSeoUpdate = _require4.baiduSeoUpdate,
    baiduSeoDelete = _require4.baiduSeoDelete;

var CONFIG = require("../app.config");

var ArticleCtrl = initController(["list", "item"]); // 获取文章列表

ArticleCtrl.list.GET = function (req, res) {
  // 初始化查询条件
  var _req$query = req.query,
      keyword = _req$query.keyword,
      category = _req$query.category,
      category_slug = _req$query.category_slug,
      tag = _req$query.tag,
      tag_slug = _req$query.tag_slug,
      date = _req$query.date;

  var _map = [req.query.page || 1, req.query.per_page || 8, req.query.state, req.query["public"], req.query.origin, req.query.hot].map(function (k) {
    return Number(k);
  }),
      _map2 = _slicedToArray(_map, 6),
      page = _map2[0],
      per_page = _map2[1],
      status = _map2[2],
      publicStatus = _map2[3],
      origin = _map2[4],
      hot = _map2[5]; // 过滤条件


  var options = {
    page: page,
    populate: ["category", "tags"],
    select: "-password -content",
    sort: {
      _id: SORT_TYPE.desc
    }
  };

  if (!numberIsInvalid(per_page)) {
    options.limit = per_page;
  } // 查询参数


  var query = {}; // 标签 id 查询

  if (tag) {
    query.tag = tag;
  } // 分类 id 查询


  if (category) {
    query.category = category;
  } // 热评查询


  if (hot) {
    options.sort = {
      comments: SORT_TYPE.desc,
      likes: SORT_TYPE.desc
    };
  } // 关键词查询


  if (keyword) {
    var keywordReg = new RegExp(keyword);
    query.$or = [{
      title: keywordReg
    }, {
      content: keywordReg
    }, {
      description: keywordReg
    }];
  } // 时间查询


  if (date) {
    var getDate = new Date(date);

    if (getDate.toString() !== "Invalid Date") {
      query.create_at = {
        $gte: new Date((getDate / 1000 - 60 * 60 * 8) * 1000),
        $lt: new Date((getDate / 1000 + 60 * 60 * 16) * 1000)
      };
    }
  } // 按照发布状态查询


  if (objectValues(PUBLISH_STATE).includes(status)) {
    query.status = status;
  } // 按照公开状态查询


  if (objectValues(PUBLIC_STATE).includes(publicStatus)) {
    query["public"] = publicStatus;
  } // 文章来源性质查询


  if (objectValues(ORIGIN_STATE).includes(origin)) {
    query.origin = origin;
  } // 如果是前台请求，则重置公开状态和发布状态


  if (!authIsVerified(req)) {
    query.status = PUBLISH_STATE.published; // query.public = PUBLIC_STATE.public
  } // 请求对应文章


  var getArticles = function getArticles() {
    Article.paginate(query, options).then(function (articles) {
      handleSuccess({
        res: res,
        result: handlePaginateData(articles),
        message: "文章列表获取成功"
      });
    })["catch"](humanizedHandleError(res, "文章列表获取失败~"));
  }; // 分类别名查询 - 根据别名查询到 id，然后根据 id 查询


  if (category_slug) {
    return Category.find({
      slug: category_slug
    }).then(function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
          _ref2 = _slicedToArray(_ref, 1),
          category = _ref2[0];

      if (category) {
        query.category = category._id;
        getArticles();
      } else {
        handleError({
          res: res,
          message: "分类不存在"
        });
      }
    })["catch"](humanizedHandleError(res, "分类查找失败"));
  } // 标签别名查询 - 根据别名查询到 id，然后根据 id 查询


  if (tag_slug) {
    return Tag.find({
      slug: tag_slug
    }).then(function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
          _ref4 = _slicedToArray(_ref3, 1),
          tag = _ref4[0];

      if (tag) {
        query.tags = tag._id;
        getArticles();
      } else {
        handleError({
          res: res,
          message: "标签不存在"
        });
      }
    })["catch"](humanizedHandleError(res, "标签查找失败"));
  } // 默认请求文章列表


  getArticles();
}; // 新增文章


ArticleCtrl.list.POST = function (_ref5, res) {
  var article = _ref5.body;

  // 验证
  if (!article.title || !article.content) {
    return handleError({
      res: res,
      message: "内容不合法"
    });
  } // 保存文章


  new Article(article).save().then(function () {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : article;
    handleSuccess({
      res: res,
      result: result,
      message: "文章发布成功"
    }); // TagCtrl.redisTagsCache.update();

    updateAndBuildSiteMap();
    baiduSeoPush("".concat(CONFIG.APP.URL, "/article/").concat(result.id));
  })["catch"](humanizedHandleError(res, "文章发布失败"));
}; // 批量修改(物理删除)


ArticleCtrl.list.PATCH = function (_ref6, res) {
  var _ref6$body = _ref6.body,
      articles = _ref6$body.articles,
      action = _ref6$body.action;

  // 验证
  if (arrayIsInvalid(articles)) {
    return handleError({
      res: res,
      message: "缺少有效参数"
    });
  } // 要改的数据


  var actions = {
    1: PUBLISH_STATE.recycle,
    2: PUBLISH_STATE.draft,
    3: PUBLISH_STATE.published
  };
  var doAction = actions[action];
  var updatePart = objectValues(actions).includes(doAction) ? {
    state: doAction
  } : {};
  Article.updateMany({
    _id: {
      $in: articles
    }
  }, {
    $set: updatePart
  }, {
    multi: true
  }).then(function (result) {
    handleSuccess({
      res: res,
      result: result,
      message: "文章批量操作成功"
    }); // TagCtrl.redisTagsCache.update();

    updateAndBuildSiteMap();
  })["catch"](humanizedHandleError(res, "文章批量操作失败"));
}; // 批量删除


ArticleCtrl.list.DELETE = function (_ref7, res) {
  var articles = _ref7.body.articles;

  // 验证
  if (arrayIsInvalid(articles)) {
    return handleError({
      res: res,
      message: "缺少有效参数"
    });
  } // delete action


  var deleteArticls = function deleteArticls() {
    Article.deleteMany({
      _id: {
        $in: articles
      }
    }).then(function (result) {
      handleSuccess({
        res: res,
        result: result,
        message: "文章批量删除成功"
      });
      updateAndBuildSiteMap();
    })["catch"](humanizedHandleError(res, "文章批量删除失败"));
  }; // baidu-seo-delete


  Article.find({
    _id: {
      $in: articles
    }
  }, "id").then(function (articles) {
    if (articles && articles.length) {
      var urls = articles.map(function (article) {
        return "".concat(CONFIG.APP.URL, "/article/").concat(article.id);
      }).join("\n");
      baiduSeoDelete(urls);
    }

    deleteArticls();
  })["catch"](deleteArticls);
}; // 获取单个文章


ArticleCtrl.item.GET = function (_ref8, res) {
  var article_id = _ref8.params.article_id;
  // 判断来源
  var isFindById = isNaN(Number(article_id)); // 获取相关文章

  var getRelatedArticles = function getRelatedArticles(result) {
    Article.find({
      status: PUBLISH_STATE.published,
      tags: {
        $in: result.tags.map(function (t) {
          return t._id;
        })
      }
    }, "id title description thumbnail -_id", function (err, articles) {
      result.related = err ? [] : articles;
      handleSuccess({
        res: res,
        result: result,
        message: "文章获取成功"
      });
    });
  };

  (isFindById ? Article.findById(article_id) : Article.findOne({
    id: article_id,
    status: PUBLISH_STATE.published
  }).populate("category tags").exec()).then(function (result) {
    // 每请求一次，浏览次数都要增加
    if (!isFindById) {
      result.views++;
      result.save(); // redis.get(REDIS_CACHE_FIELDS.todayViews).then(views => {
      //   redis.set(REDIS_CACHE_FIELDS.todayViews, (views || 0) + 1)
      // })
    } // 如果是前台用户请求，则需要获取相关文章


    if (!isFindById && result.tags.length) {
      getRelatedArticles(result.toObject());
    } else {
      handleSuccess({
        res: res,
        result: result,
        message: "文章获取成功"
      });
    }
  })["catch"](humanizedHandleError(res, "文章获取失败", 404));
}; // 修改单个文章


ArticleCtrl.item.PATCH = function (_ref9, res) {
  var article_id = _ref9.params.article_id,
      article = _ref9.body;

  // 验证
  if (!article.title || !article.content) {
    return handleError({
      res: res,
      message: "内容不合法"
    });
  } // 修正信息
  // Reflect.deleteProperty(article, "meta")
  // Reflect.deleteProperty(article, "create_at")
  // Reflect.deleteProperty(article, "update_at")
  // 修改文章


  Article.findByIdAndUpdate(article_id, article, {
    "new": true
  }).then(function (result) {
    handleSuccess({
      res: res,
      result: result,
      message: "文章修改成功"
    }); // TagCtrl.redisTagsCache.update()

    updateAndBuildSiteMap();
    baiduSeoUpdate("".concat(CONFIG.APP.URL, "/article/").concat(result.id));
  })["catch"](humanizedHandleError(res, "文章修改失败"));
}; // 删除单个文章


ArticleCtrl.item.DELETE = function (_ref10, res) {
  var article_id = _ref10.params.article_id;
  Article.findByIdAndRemove(article_id).then(function (result) {
    handleSuccess({
      res: res,
      result: result,
      message: "文章删除成功"
    }); // TagCtrl.redisTagsCache.update()

    updateAndBuildSiteMap();
    baiduSeoDelete("".concat(CONFIG.APP.URL, "/article/").concat(result.id));
  })["catch"](humanizedHandleError(res, "文章删除失败"));
};

exports.list = buildController(ArticleCtrl.list);
exports.item = buildController(ArticleCtrl.item);
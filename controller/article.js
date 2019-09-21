/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 14:42:04
 * @Description: 文章控制器
 */

const Article = require("../models/Article");

class ArticleController {
  // 根据查询条件查询文章
  async getArticles(req, res) {
    let { page = 1, per_page = 10 } = req.query;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page;
    await Article.find()
      .populate([
        {
          path: "category"
        },
        {
          path: "author"
        },
        {
          path: "tags"
        }
      ])
      .skip(skip)
      .limit(per_page)
      .exec((err, articles) => {
        if (err) {
          return res.status(500).json({
            code: 1,
            message: "服务器内部错误~"
          });
        } else {
          return res.json({
            code: 0,
            message: "获取文章数据成功~",
            articles,
            pagination: {
              page,
              per_page
            }
          });
        }
      });
  }

  // 查询文章详情
  async getArticle(req, res) {
    const { id } = req.params;
    await Article.findById(id, (err,article) => {
        if (err) {
            return res.status(500).json({
                code: 1,
                message: '服务器内部错误~'
            })
        }
        if (article) {
            return res.json({
                code: 0,
                message: '获取文章详情成功~',
                article
            })
        } else {
            return res.json({
                code: 1,
                message: '该文章不存在~'
            })
        }
    })
  }

  // 增加文章
  async createArticle(req, res) {
    const { title, category, author, tags } = req.body;
    await new Article({
      title,
      category,
      author,
      tags
    }).save(err => {
      if (err) {
        return res.status(500).json({
          code: 1,
          message: "服务器内部错误~"
        });
      } else {
        return res.status(201).json({
          code: 0,
          message: "文章创建成功~"
        });
      }
    });
  }

  // 修改文章
  async updateArticle(req, res) {
      const {id} = req.params;
      const {...update} = req.body;
      const opt = {
          new: true
      }
      await Article.findById(id, update, opt, (err,article) => {
        if (err) {
            return res.status(500).json({
                code: 1,
                message: '服务器内部错误~'
            })
        }
        if (article) {
            return res.json({
                code: 0,
                message: '文章更新成功~'
            })
        } else {
            return res.json({
                code: 1,
                message: '该文章不存在~'
            })
        }
    })
  }

  // 删除文章
  async delArticle(req, res) {
      const {id} = req.params;
      await Article.findByIdAndRemove(id, (err,article) => {
        if (err) {
            return res.status(500).json({
                code: 1,
                message: '服务器内部错误~'
            })
        }
        if (article) {
            return res.json({
                code: 0,
                message: '文章删除成功~'
            })
        } else {
            return res.json({
                code: 1,
                message: '该文章不存在~'
            })
        }
      })
  }
}

module.exports = new ArticleController();
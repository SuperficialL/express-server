const category = require('../controller/category')
const tags = require('../controller/tags')
const article = require('../controller/article')
const user = require('../controller/user')
const banner = require('../controller/banner')
const multer = require('../utils/multer')
const file = require('../controller/upload')
const authMiddleware = require('../middleware/auth')


module.exports = app => {
    /** 
     * 博客文章路由
     *params articles 获取所有文章数据
     *params article 获取博客文章详情
     */
    app.get('/articles', article.getArticles)
    app.post('/articles', article.createArticle)
    app.get('/articles/:id', article.getDetail)
    app.patch('/articles/:id', article.updateArticle)
    app.delete('/articles/:id', article.deleteArticle)

    /** 
     * 博客分类路由
     *params categories 获取所有分类数据
     */
    app.get('/categories', category.getCategories)
    app.get('/categories/:id', category.getCategory)

    /** 
     * 博客标签路由
     *params tags 获取所有标签数据
     */
    app.get('/tags', tags.getTags)
    app.post('/tags', tags.createTag)
    app.get('/tags/:id', tags.getTag)

    /** 
     * 博客用户路由
     *params getUsers 获取所有用户数据
     *params getUser 获取用户详细数据
     */
    app.get('/users', user.getUsers)
    app.get('/users/:id', user.getUser)
    app.post('/login', user.login)

    /** 
     * 博客轮播路由
     *params getUsers 获取所有用户数据
     *params getUser 获取用户详细数据
     */
    app.get('/banners', banner.getBanners)

    // 前端导航路由
    app.get('/api/categories', category.getMenu)
    app.get('/api/categories/:id', category.getCateArticles)
}
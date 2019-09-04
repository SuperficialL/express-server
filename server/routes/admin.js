/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 14:42:04
 * @Description: 后端路由接口
 */

const express = require('express');
const category = require('../controller/admin/category');
const tags = require('../controller/admin/tags');
const article = require('../controller/admin/article');
const user = require('../controller/admin/user');
const banner = require('../controller/admin/banner');
const multer = require('../utils/multer');
const file = require('../controller/admin/upload');
const authMiddleware = require('../middleware/auth');

module.exports = app => {
    const router = express.Router({
        mergeParams: true
    });

    // 后台登录注册路由
    router.post('/login', user.login);
    router.post('/register', user.register);
    router.get('/profile', user.profile);

    // 博客分类路由
    router.get('/categories',category.getCategories)
    router.get('/categories/:id', category.getCategory)
    router.post('/categories', category.createCategory)
    router.delete('/categories/:id', category.deleteCategory)
    router.put('/categories/:id', category.updateCategory)

    // router.get('/articles', getArticles)
    // router.post('/articles', article.createArticle)
    // router.get('/articles/:id',getDetail)
    // router.patch('/articles/:id',article.updateArticle)
    // router.delete('/articles/:id',article.deleteArticle)
    
    // router.get('/categories', category.getMenu)
    // router.get('/categories/:id', category.getCateArticles)
    /** 
     * 博客标签路由
     *params tags 获取所有标签数据
    */
    // router.get('/tags',tags.getTags)
    // router.get('/tags/:id',tags.getTag)
    // router.post('/tags',tags.createTag)
    // router.patch('/tags/:id', tags.updateTag)
    // router.delete('/tags/:id',tags.deleteTag)


    /** 
     * 博客用户路由
     *params getUsers 获取所有用户数据
     *params getUser 获取用户详细数据
    */
    // router.get('/users',user.getUsers)
    // router.get('/users/:id',user.getUser)
    // router.post('/users', user.createUser)
    // router.patch('/users/:id', user.updateUser)
    // router.delete('/users/:id',user.deleteUser)
    // router.post('/register', user.register)

    /** 
     * 博客轮播路由
     *params getUsers 获取所有用户数据
     *params getUser 获取用户详细数据
     */
    // router.get('/banners', banner.getBanners)

    /** 
     * upload 文件上传路由
    */

    // router.post('/uploads', multer.single('file'), file.img)

    app.use('/admin', router);
}
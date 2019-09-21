/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-31 14:42:04
 * @Description: 后端路由接口
 */

const express = require('express');
const UserController = require('../controller/user');
const TagController = require('../controller/tags');
const CategoryController = require('../controller/category');
const ArticleController = require('../controller/article');
const BannerController = require('../controller/banner');
const multer = require('../utils/multer');
const file = require('../controller/upload');

module.exports = app => {
    const router = express.Router({
        mergeParams: true
    });

    // 用户路由
    router.post('/login', UserController.login);
    router.post('/register', UserController.register);
    router.get('/users',UserController.getUserList);
    router.get('/users/:id',UserController.getUser);
    router.patch('/users/:id',UserController.updateUser);
    router.delete('/users/:id',UserController.delUser);
    router.patch('/resetpwd',UserController.updatePassword);

    // 分类路由
    router.get('/categories', CategoryController.getCategories);
    router.get('/categories/:id', CategoryController.getCategory);
    router.post('/categories', CategoryController.createCategory);
    router.patch('/categories/:id', CategoryController.updateCategory);
    router.delete('/categories/:id', CategoryController.delCategory);

    // 标签路由
    router.get('/tags', TagController.getTags);
    router.get('/tags/:id', TagController.getTag);
    router.post('/tags', TagController.createTag);
    router.patch('/tags/:id', TagController.updateTag);
    router.delete('/tags/:id', TagController.delTag);

    // 文章路由
    router.get('/articles', ArticleController.getArticles);
    router.get('/articles/:id', ArticleController.getArticle);
    router.post('/articles', ArticleController.createArticle);
    router.patch('/articles/:id', ArticleController.updateArticle);
    router.delete('/articles/:id', ArticleController.delArticle);


    app.use('/admin', router);
};
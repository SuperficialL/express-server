/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-08-27 21:42:49
 * @Description: 文章模型
 */

const { mongoose } = require('../core/mongodb');

const ArticleSchema = new mongoose.Schema({
    // 标题
    title: { type: String,required: true },
    
    // 分类
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    },

    // 作者
    author: { 
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    // 缩略图
    img: { type: String },

    // 摘要
    summary: { type: String },

    // 正文
    body: { type: String },

    // 文章发布状态 => 0:草稿 1:发布
    status: { type: Number, default: 1 },

    // 标签
    tags: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'Tag'
    }],

    // 评论
    // comments:[{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Comment'
    // }],

    // 其他元信息
    meta: {
        // 访问量
        views: { type: Number,default:0 },
        likes: { type: Number,default:0 },
        comments: { type: Number,default:0 },
    },

    // 版本号
    __v: { type: Number, select: false }
});

module.exports = mongoose.model('Article',ArticleSchema);
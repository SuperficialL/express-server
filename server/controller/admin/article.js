const marked = require('marked')
const  Article = require('../../models/Article')
// 查询文章详情
exports.getDetail = async(req,res) => {
    const {id} = req.params
    const article = await Article.findById(id).populate([
        { path:'author' },
        { path:'category' },
        { path:'tags' }
    ])
    article.meta.views ++
    article.save()
    res.json(article)
}

// 查询文章
exports.getArticles = async(req,res) => {
    let page = parseInt(req.query.page) || 1;
    let per_page = parseInt(req.query.per_page) || 10;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * per_page
    let data = {
        total: 0,
        page: page,
        pages: 0,
        per_page: per_page,
        articles: []
    }
    await Article.countDocuments({},(err,total) => {
        if (err) {
            console.log('Error:'+err)
        } else {
            data.total = total
            data.pages = Math.ceil(total / per_page)
        }
    })
    data.articles = await Article.find().populate([
        { path:'author' },
        { path:'category' },
        { path:'tags' }
    ]).skip(skip).limit(per_page).sort({
        createdAt: 1
    }).exec()
    res.json(data)
}

// 增加文章
exports.createArticle = async(req,res) => {
    const { title,category,author,img,tags,body } = req.body
    const content = marked(body)
    const article = await Article.create({
        title,
        author,
        summary,
        tags,
        img,
        body,
        format_content: content,
        category
    })
    res.json({
        'code': 1,
        'message':'增加成功~',
        article
    })
}

// 更新文章
exports.updateArticle = async(req,res) => {
    const {id} = req.params
    const { title, author,summary,tags,img,category,body } = req.body;
    const content = marked(body)
    console.log(img);
    
    article = await Article.findByIdAndUpdate(id, {
        title,
        author,
        summary,
        tags,
        img,
        body,
        format_content: content,
        category
    })
    res.json({
        'code': 1,
        'message':'更新成功~',
        article
    })
}

// 删除文章
exports.deleteArticle = async(req,res) => {
    const {id} = req.params
    article = await Article.findByIdAndDelete(id)
    res.json({
        'code': 1,
        'message':'删除成功~',
    })
}
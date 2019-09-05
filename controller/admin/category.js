/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-01 01:37:36
 * @Description: 分类路由控制器
 */
const  Category = require('../../models/Category');
const  Article = require('../../models/Article');

/**
 * @description: 查询所有详情
 * @param {} 
 * @return: data:{code:number,message:string,results:any[]}
 */
exports.getCategories = async(req,res) => {
    await Category.find().populate({
        path:'parent'
    }).exec((err,data) => {
        if(err) {
            res.status(500).json({
                code: 0,
                message: err.message
            });
            return;
        } else {
            if (data) {
                res.json({
                    code: 1,
                    message: "查询分类数据成功~",
                    results: data
                });
                return;
            } else {
                res.json({
                    code: 1,
                    message: "查询分类数据失败~"
                });
                return;
            }
        }
    })
}

/**
 * @description: 通过{id}查询单个详情
 * @param {id:string} 
 * @return: data: {code:number,message:string,results:any[]}
 */
exports.getCategory = async(req,res) => {
    const {id} = req.params;
    await Category.findById(id).populate({
        path: 'parent'
    }).exec((err, data) => {
        if (err) {
            res.status(500).json({
                code: 0,
                message: err.message
            });
            return;
        } else {
            if (data) {
                res.json({
                    code: 1,
                    message: "查询分类详情数据成功~",
                    results: data
                });
                return;
            } else {
                res.json({
                    code: 0,
                    message: "查询分类详情数据失败~"
                });
                return;
            }
        }
    })
}


/**
 * @description: 创建分类
 * @param {name:string,parent:string} 
 * @return: data: {code:string,message:string}
 */
exports.createCategory = async(req,res) => {
    const {name,parent} = req.body;
    console.log(parent);
    if (!name) {
        res.status(400).json({
            code: 0,
            message: "分类名不可为空~"
        })
    };
    await Category.findOne({name}).exec((err,category) => {
        if (err) {
            res.status(500).json({
                code: 0,
                message: err.message
            });
            return;
        } else {
            if (category) {
                res.status(200).json({
                    code: 0,
                    message: "分类名已存在~"
                });
                return;
            } else {
                let category = new Category({
                    name,
                    parent
                });
                category.save((err, category) => {
                    console.log(err,'err');
                    if (err) {
                        res.status(500).json({
                            code: 0,
                            message: err.message
                        });
                        return;
                    } else {
                        if (category) {
                            res.status(201).json({
                                code: 1,
                                message: "分类创建成功~"
                            });
                            return;
                        } else {
                            res.status(200).json({
                                code: 0,
                                message: "分类创建失败~"
                            });
                            return;
                        }
                    }
                });
            }
        }
    })
}


/**
 * @description: 删除分类
 * @param {id:objectId} 
 * @return: data:{code:number,message:string}
 */
exports.deleteCategory = async(req,res) => {
    const {id} = req.params;
    await Category.findByIdAndDelete(id).exec((err,category) => {
        if (err) {
            res.status(500).json({
                code: 0,
                message: err.message
            });
            return;
        } else {
            if (category) {
                res.status(200).json({
                    code: 1,
                    message: "分类删除成功~"
                });
                return;
            } else {
                res.status(200).json({
                    code: 0,
                    message: "分类删除失败~"
                });
                return;
            }
        }
        
    })
}

/**
 * @description: 修改分类
 * @param {id:objectId}
 * @data {name:string,parent?:objectId}
 * @return: data:{code:number,message:string}
 */
exports.updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name,parent} = req.body;
    let data = parent ? {name,parent} : {name};
    await Category.findByIdAndUpdate(id,{data}).exec((err, category) => {
        if (err) {
            res.status(500).json({
                code: 0,
                message: err.message
            });
            return;
        } else {
            if (category) {
                res.status(200).json({
                    code: 1,
                    message: "分类更新成功~"
                });
                return;
            } else {
                res.status(400).json({
                    code: 0,
                    message: "分类更新失败~"
                });
                return;
            }
        }
    })
}


/**
 * @description: 导航
 * @param {type} 
 * @return: 
 */
exports.getMenu = async(req,res) => {
    const parent = await Category.find({parent: {$exists: true}})
    await Category.aggregate([
        { $match: { parent: parent._id } },
        { $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children"
        }
    }])
    res.json(categories)
}

// 查询单个分类下的所有文章
exports.getCateArticles = async(req,res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = Number(page - 1) < 0 ? 0 : Number(page - 1) * limit
    let data = {
        total: 0,
        articles: []
    }
    const {id} = req.params
    await Article.countDocuments({},(err,total) => {
        if (err) {
            console.log('Error:'+err)
        } else {
            data.total = total
        }
    })
    const category = await Category.findById(id)
    data.articles = await Article.aggregate([
        { $match: { category:category._id } },
        {
            $lookup: {
                from: "articles",
                localField: "_id",
                foreignField: "parent",
                as: "articles"
            }
        }
    ]).skip(skip).limit(limit).sort({createdAt: 1}).exec()
    res.json(data)
}
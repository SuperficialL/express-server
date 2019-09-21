/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-09-07 13:52:33
 * @Description:  标签控制器
 */

const Tag = require('../models/Tag');

class TagController {
    // 获取所有标签
    async getTags(req,res) {
        await Tag.find({}).exec((err,tags) => {
            if (err) {
                return res.status(500).json({
                    code: 0,
                    message: '服务器内部错误~',
                })
            }
            if (tags) {
                return res.json({
                    code: 0,
                    message: '获取标签数据成功~',
                    tags
                })
            }
        });

    }

    // 获取标签详情
    async getTag(req,res) {
        const {id}  = req.params;
        await Tag.findById(id).exec((err,tag) => {
            if (err) {
                return res.status(500).json({
                    code: 0,
                    message: '服务器内部错误~',
                })
            }
            if (tag) {
                return res.json({
                    code: 0,
                    message: '获取标签数据成功~',
                    tag
                })
            } else {
                return res.json({
                    code: 1,
                    message: '该标签数据不存在~'
                })
            }
        });
    }

    // 创建标签
    async createTag(req,res) {
        const {...data} = req.body;
        await new Tag(data).save(err => {
            if (err) {
                return res.status(500).json({
                    code:1,
                    message: '服务器内部错误~'
                })
            } else {
                return res.status(201).json({
                    code:0,
                    message: '标签创建成功~'
                })
            }
        });
    }

    // 修改标签
    async updateTag(req,res) {
        const {id} = req.params;
        const {...update} = req.body;
        const opt = {
            new: true
        };
        await Tag.findByIdAndUpdate(id,update,opt).exec((err,tag) => {
            if (err) {
                return res.status(500).json({
                    code: 1,
                    message: '服务器内部错误~'
                })
            }
            if (tag) {
                return res.json({
                    code: 0,
                    message: '标签修改成功~'
                })
            } else {
                return res.json({
                    code: 1,
                    message: '该标签数据不存在~'
                })
            }
        })
    }

    // 删除标签
    async delTag(req,res) {
        const {id} = req.params;
        await Tag.findByIdAndRemove(id,(err,tag) => {
            if (err) {
                return res.status(500).json({
                    code: 1,
                    message: '服务器内部错误~'
                })
            }
            if (tag) {
                return res.json({
                    code: 0,
                    message: '标签删除成功~'
                })
            } else {
                return res.json({
                    code: 1,
                    message: '该标签不存在~'
                })
            }
        })
    }
}

module.exports = new TagController();

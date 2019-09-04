const Tag = require('../../models/Tag')

exports.getTags = async(req,res) => {
    tags = await Tag.find()
    res.json(tags)
}

exports.getTag = async(req,res) => {
    const {id}  = req.params
    tags = await Tag.findById(id)
    res.json(tags)
}

exports.createTag = async(req,res) => {
    tag = await Tag.create(req.body)
    res.json({
        'code':1,
        'message': '创建标签成功~',
        tag
    })
}

exports.updateTag = async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    Tag.findByIdAndUpdate(id,{name},(err,tag) => {
        if (err) {
            res.json({
                'code': 0,
                'message': err.message
            })
        } else {
            if (!tag) {
                res.json({
                    'code':0,
                    'message': '标签已存在~'
                })
            } else{
                tag = Tag({
                    name
                })
                tag.save()
                res.json({
                    'code':1,
                    'message': '更新标签成功!'
                })
            }
        }
    })
}

exports.deleteTag = async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    Tag.findByIdAndDelete(id, {name}, (err, tag) => {
        if (err) {
            res.json({
                'code': 0,
                'message': err.message
            })
        } else {
            res.json({
                'code': 1,
                'message': '删除标签成功!'
            })
        }
    })
}
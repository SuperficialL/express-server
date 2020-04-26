/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2020-03-13 19:37:07
 * @Description:  标签控制器
 */

const Tag = require("../models/Tag");
const { Response,handlePaginateData,handleSuccess } = require("../utils/helper");
const { PUBLISH_STATE, PUBLIC_STATE, ORIGIN_STATE, SORT_TYPE, REDIS_CACHE_FIELDS } = require("../core/constants");

class TagCtrl {
  // 获取所有标签
  async getTags(ctx) {
    const [ page, per_page ] = [ ctx.query.page || 1, ctx.query.per_page ].map(k => Number(k));
    // 过滤条件
    const options = {
      page,
      sort: { _id: SORT_TYPE.desc },
      lean: true,
      leanWithId:false
    }
    const tags = await Tag.paginate({}, options);;
    ctx.body = handleSuccess({ 
      result: handlePaginateData(tags), 
      message: "标签获取成功~" 
    });
  }

  // 获取标签详情
  async getTag(ctx) {
    const { tag_id } = ctx.params;
    const tag = await Tag.findById(id);
    ctx.body = tag
      ? new Response().json(tag)
      : new Response().error("标签不存在~");
  }

  // 创建标签
  async createTag(ctx) {
    const { title, slug } = ctx.request.body;
    await new Tag({
      title,
      slug
    }).save();
    ctx.body = handleSuccess({ message: "标签创建成功~"});
  }

  // 修改标签
  async updateTag(ctx) {
    const { tag_id } = ctx.params;
    const { ...update } = ctx.request.body;
    const res = await Tag.findByIdAndUpdate(tag_id, update,{ new: true });
    ctx.body = res
      ? handleSuccess({message: "标签修改成功~"})
      : handleSuccess({message: "标签修改失败~"});
  }

  // 删除标签
  async delTag(ctx) {
    const { tag_id } = ctx.params;
    const tag = await Tag.findByIdAndRemove(tag_id);
    ctx.body = tag
      ? handleSuccess({message: "标签刪除成功~"})
      : handleSuccess({message: "标签刪除失败~"})
  }
}

module.exports = new TagCtrl();

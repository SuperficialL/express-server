/*
 * @Author: Superficial
 * @Date: 2020-03-27 16:59:00
 * @LastEditTime: 2020-03-27 17:03:42
 * @Description: 菜单模型
 */

const { mongoose } = require("../core/db");

const menuSchema = new mongoose.Schema(
  {
    // 菜单名
    name: {
      type: String,
      required: true
    },

    // 父级分类
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Menu"
    },

    // 链接路径
    path: { type: String },

    // 组件路径
    components: { type: String },

    // 图标
    icon: { type: String },

    // 排序
    ordering: { type: Number },

    // 是否显示
    isMenu: { type: Boolean },

    // 内部菜单
    isShow: { type: Boolean }
  }
);

module.exports = mongoose.model("Menu", menuSchema);
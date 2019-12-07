/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-12-04 20:57:12
 * @Description: 友链模型
 */

const { mongoose } = require("../core/db");

// 友链模型
const FriendLinkSchema = new mongoose.Schema(
  {
    // 友链名称
    title: { type: String, required: true },

    // 友链地址
    address: { type: String, required: true },

    // 创建日期
    created_time: { type: Date, default: Date.now },

    // 最后修改日期
    updated_time: { type: Date, default: Date.now },

    // 版本号
    __v: { type: Number, select: false }
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time"
    }
  }
);

// 友链模型
module.exports = mongoose.model("FriendLink", FriendLinkSchema);

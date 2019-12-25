/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime : 2019-12-25 11:47:49
 * @Description: 轮播模型
 */

const { mongoose } = require("../core/db");

const CarouselSchema = new mongoose.Schema(
  {
    // 标题
    title: { type: String, required: true },

    // 轮播项目
    items: [
      {
        image: { type: String },
        url: { type: String }
      }
    ],

    // 创建时间
    created_time: {
      type: Date,
      default: Date.now
    },

    // 修改日期
    updated_time: {
      type: Date,
      default: Date.now
    },

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

module.exports = mongoose.model("Carousel", CarouselSchema);

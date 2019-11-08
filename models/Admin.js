/*
 * @author: SuperficialL
 * @Date: 2019-08-24 12:35:32
 * @LastEditTime: 2019-11-07 23:53:56
 * @Description: 用户模型
 */

const bcrypt = require("bcrypt");
const { mongoose } = require("../core/db");

const UserSchema = new mongoose.Schema(
  {
    // 用户名
    username: { type: String, required: true },

    // 性别
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true
    },

    // 一句话介绍
    headline: { type: String },

    // 职业 公司 工作
    employments: {
      type: [{ company: { type: String }, job: { type: String } }]
    },

    // 教育经历
    educations: {
      type: [
        {
          // 学校
          school: { type: String },
          // 专业
          major: { type: String },
          // 学历  高中及以下， 大专，本科 ，硕士，博士及以上
          diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
          // 入学年份
          entrance_year: { type: Number }
        }
      ]
    },

    // 密码
    password: {
      type: String,
      required: true,
      select: false,
      set(val) {
        return bcrypt.hashSync(val, 10);
      }
    },

    // 头像
    avatar: { type: String },

    // 邮箱
    email: { type: String, required: true },

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

module.exports = mongoose.model("User", UserSchema);

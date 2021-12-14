//引入db配置
const db = require("../config/db")
//引入jwt做token验证
const jwt = require("jsonwebtoken")
//解析token
const tools = require("../public/tool")
// 现在时间
const date = require("../public/date")

//引入sequelize对象
const Sequelize = db.sequelize
//引入数据表模型
const classify = Sequelize.import("../module/user")
//自动创建表
classify.sync({ force: false })

//数据库操作类
class classifyModule {
    static async userRegist(data) {
      return await classify.create({
        password: data.password,
        mobileNo: data.mobileNo,
        userType: data.userType,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    }
  
    static async getUserInfo(mobileNo) {
      return await classify.findOne({
        where: {
          mobileNo,
        },
      })
    }
  }
class ClassifyController {
    static async add(ctx){

    }
    static async del(ctx){
        
    }
    static async edit(ctx){
        
    }
    static async get(ctx){
        
    }
}
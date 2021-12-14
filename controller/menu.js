//引入db配置
const db = require("../config/db")
//引入jwt做token验证
const jwt = require("jsonwebtoken")

//解析token
const tools = require("../public/tool")
const Sequelize = db.sequelize
//引入数据表模型
const menu = Sequelize.import("../module/menu")
//自动创建表
menu.sync({ force: false })
//数据库操作类
class menuModule {
  static async getMenus(data) {
    return await menu.findAll()
  }

  static async getUserInfo(mobileNo) {
    return await menu.findOne({
      where: {
        mobileNo,
      },
    })
  }
}
class menuController {
  // 新增菜单
  static async create(ctx) {
    const req = ctx.request.body
    const token = ctx.headers.authorization
    if (token) {
      const result = await tools.verToken(token)
      console.log(result)
    }
  }
  //查询菜单
  static async getMenuList() {
    const menus = await menuModule.getMenus()
    return (ctx.body = {
      code: "200",
      data: {
        menus,
      },
      message: "获取菜单失败",
    })
  }
}

module.exports = menuController

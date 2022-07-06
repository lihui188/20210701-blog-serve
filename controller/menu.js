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
	static async add(data) {
		return await menu.create({
			parentId: data.parentId,
			icon: data.icon,
			menuName: data.menuName,
			path: data.path,
			sort: data.sort,
			isShow: data.isShow,
			createdAt: date.formatNowDate(),
		})
	}
}
class menuController {
	// 新增菜单
	static async create(ctx) {
		const req = ctx.request.body
		const token = ctx.headers.authorization
		if (token) {
			const param = {
				parentId: req.parentId,
				icon: req.icon,
				menuName: req.menuName,
				path: req.path,
				sort: req.sort,
				isShow: req.isShow,
			}
			const data = await menuModule.add(param)
      console.log(data)
      ctx.response.status = 200
          ctx.body = {
            code: 200,
            desc: "保存成功",
          }
		}
	}
	//查询菜单
	static async getMenuList() {
		const menus = await menuModule.getMenus()
    ctx.response.status = 200
		return (
      ctx.body = {
        code: "200",
        data: {
          menus,
        },
        message: "获取菜单成功",
		})
	}
}

module.exports = menuController

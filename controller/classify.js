//引入db配置
const db = require("../config/db")
//引入jwt做token验证
const jwt = require("jsonwebtoken")
//解析token
const tools = require("../public/tool")

//引入sequelize对象
const Sequelize = db.sequelize
//引入数据表模型
const classify = Sequelize.import("../module/classify")
//自动创建表
classify.sync({ force: false })

//数据库操作类
class classifyModule {
  static async add(data) {
    return await classify.create({
      name: data.name,
      alias: data.alias,
    })
  }
  static async get(id) {
    return await classify.findOne({
      where: {
        id,
      },
    })
  }
  static async getInfo(name) {
    return await classify.findOne({
      where: {
        name,
      },
    })
  }
  static async del(ids) {
    var seq = require("sequelize")
    var Op = seq.Op
    return await classify.destroy({
      where: {
        id: { [Op.in]: ids },
      },
    })
  }
  static async edit(data) {
    return await classify.update(
      {
        name: data.name,
        alias: data.alias,
      },
      {
        where: { id: data.id },
      }
    )
  }
  static async page() {
    return await classify.findAndCountAll()
  }
}
class ClassifyController {
  static async add(ctx) {
    const req = ctx.request.body
    const token = ctx.headers.authorization
    if (token) {
      if (req.name && req.alias) {
        console.log(req.name)
        try {
          const query = await classifyModule.getInfo(req.name)
          if (query) {
            ctx.response.status = 400
            ctx.body = {
              code: "400",
              desc: "分类名称已存在",
            }
          } else {
            const param = {
              name: req.name,
              alias: req.alias,
            }
            const data = await classifyModule.add(param)
            ctx.response.status = 200
            ctx.body = {
              code: 200,
              desc: "添加成功",
            }
          }
        } catch (error) {
          ctx.response.status = 400
          ctx.body = {
            code: "400",
            desc: "参数不全",
          }
        }
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
  static async del(ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.body
    if (token) {
      const query = await classifyModule.del(req.ids)
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        desc: "删除成功",
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
  static async edit(ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.body
    if (token) {
      const params = {
        id: req.id,
        name: req.name,
        alias: req.alias,
      }
      const query = await classifyModule.edit(params)
      if (query) {
        ctx.response.status = 200
        ctx.body = {
          code: 200,
          desc: "修改成功",
          data: query,
        }
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
  static async get(ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.url.split("/")
    const id = Number(req[req.length - 1])
    if (token) {
      const query = await classifyModule.get(id)
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        data: query,
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
  static async page(ctx) {
    const token = ctx.headers.authorization
    if (token) {
      const query = await classifyModule.page()
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        data: query,
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
  static async list(ctx) {
    const query = await classifyModule.page()
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      data: query,
    }
  }
}
module.exports = ClassifyController

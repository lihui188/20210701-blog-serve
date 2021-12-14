//引入db配置
const db = require("../config/db")
//引入jwt做token验证
const jwt = require("jsonwebtoken")
//解析token
const tools = require("../public/tool")

//引入sequelize对象
const Sequelize = db.sequelize

const date = require("../public/date")
//引入数据表模型
const articles = Sequelize.import("../module/articles")
//自动创建表
articles.sync({ force: false })

//数据库操作类
class articlesModule {
  static async add(data) {
    return await articles.create({
      title: data.title,
      content: data.content,
      classId: data.classId,
      status: data.status,
      createdAt: date.formatNowDate(),
      describe: data.describe,
      className: data.className,
    })
  }
  static async get(id) {
    return await articles.findOne({
      where: {
        id,
      },
    })
  }
  static async getInfo(name) {
    return await articles.findOne({
      where: {
        name,
      },
    })
  }
  static async del(ids) {
    var seq = require("sequelize")
    var Op = seq.Op
    return await articles.destroy({
      where: {
        id: { [Op.in]: ids },
      },
    })
  }
  static async edit(data) {
    return await articles.update(
      {
        title: data.title,
        content: data.content,
        status: data.status,
        describe: data.describe,
        classId: data.classId,
        className: data.className,
        updatedAt: date.formatNowDate(),
      },
      {
        where: { id: data.id },
      }
    )
  }
  static async page(params) {
    return await articles.findAndCountAll({
      where: {
        status: Number(params.status),
      },
      offset: Number(params.page)
        ? (Number(params.page) - 1) * Number(params.size)
        : 0,
      limit: Number(params.size) ? Number(params.size) : 20,
      order: [["id", "desc"]],
    })
  }
  static async list(status) {
    return await articles.findAndCountAll({
      where: {
        status,
      },
    })
  }
}
class articlesController {
  static async add(ctx) {
    const req = ctx.request.body
    const token = ctx.headers.authorization
    if (token) {
      if (req.title && req.content) {
        try {
          const param = {
            title: req.title,
            content: req.content,
            status: req.status,
            describe: req.describe,
            classId: req.classId,
            className: req.className,
          }
          const data = await articlesModule.add(param)
          ctx.response.status = 200
          ctx.body = {
            code: 200,
            desc: "保存成功",
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
      const query = await articlesModule.del(req.ids)
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
        title: req.title,
        content: req.content,
        status: req.status,
        describe: req.describe,
        classId: req.classId,
        className: req.className,
      }
      const query = await articlesModule.edit(params)
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
      const query = await articlesModule.get(id)
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
  static async getclient(ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.url.split("/")
    const id = Number(req[req.length - 1])
    const query = await articlesModule.get(id)
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      data: query,
    }
  }
  static async page(ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.body
    const params = ctx.query
    if (token) {
      const query = await articlesModule.page(params)
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
  // 用户端使用
  static async list(ctx) {
    const req = ctx.request.body
    const params = ctx.query
    const query = await articlesModule.page(params)
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      data: query,
    }
  }
  /* static async list(ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.body
    const status = ctx.query.status
    const query = await articlesModule.list(status)
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      data: query,
    }
  } */
}
module.exports = articlesController

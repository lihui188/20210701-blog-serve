const path = require("path")
const fs = require("fs")
//引入db配置
const db = require("../config/db")
//引入jwt做token验证
// const jwt = require("jsonwebtoken")
//解析token
// const tools = require("../public/tool")
// 现在时间
const date = require("../public/date")

//引入sequelize对象
const Sequelize = db.sequelize
//引入数据表模型
const files = Sequelize.import("../module/files_table")
//自动创建表
files.sync({ force: false })

//数据库操作类
class filesModule {
  static async add(params) {
    return await files.create({
      ...params,
      createdAt: date.formatNowDate(),
    })
  }

  static async get(mobileNo) {
    return await files.findOne({
      where: {
        mobileNo,
      },
    })
  }

  static async page(params) {
    return await files.findAndCountAll({
      where: {
        suffix: "mp3",
      },
      offset: Number(params.page)
        ? (Number(params.page) - 1) * Number(params.size)
        : 0,
      limit: Number(params.size) ? Number(params.size) : 20,
      order: [["id", "desc"]],
    })
  }
  static async list() {
    return await files.findAll({
      where: {
        suffix: "mp3",
      },
    })
  }
  static async del(ids) {
    var seq = require("sequelize")
    var Op = seq.Op
    return await files.destroy({
      where: {
        id: { [Op.in]: ids },
      },
    })
  }
}
class filesController {
  static async uploadfile(ctx) {
    // 上传单个文件
    const file = ctx.request.files.files // 获取上传文件
    var nowDate = new Date()
    var i = file.name.lastIndexOf(".")
    var suffix = file.name.substring(i + 1)
    var filename = file.name.substring(0, i)
    var name = filename + "-" + nowDate.getTime() + "." + suffix
    const realName = filename

    const size = file.size
    const type = file.type
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    let filePath = path.join(__dirname, "../public/files") + `/${name}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    const params = {
      name,
      path: "/files/" + name,
      realName,
      size,
      suffix,
      type
    }
    const query = await filesModule.add(params)
    ctx.status = 200
    return (ctx.body = {
      code: 200,
      desc: "上传成功",
      data: query,
    })
  }
  static async page(ctx) {
    const params = ctx.query
    const query = await filesModule.page(params)
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      data: query,
    }
  }
  static async list(ctx) {
    const query = await filesModule.list()
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      data: query,
    }
  }
  static async list(ctx) {
    const query = await filesModule.list()
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      data: query,
    }
  }
  static async del(ctx) {
    const req = ctx.request.body
    const query = await filesModule.del(req.ids)
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      desc: "删除成功",
    }
  }
}
module.exports = filesController

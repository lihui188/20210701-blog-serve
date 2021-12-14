//引入db配置
const db = require("../config/db")
//引入jwt做token验证
const jwt = require("jsonwebtoken")

//解析token
const tools = require("../public/tool")
const date = require("../public/date")
const { decrypt } = require("../config/js-crypto")
//统一设置token有效时间  为了方便观察，设为10s
const expireTime = 24 * 60 * 60 + "s"
// const expireTime = 60 + "s"

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const user = Sequelize.import("../module/user")
//自动创建表
user.sync({ force: false })
//数据库操作类
class userModule {
  static async userRegist(data) {
    return await user.create({
      password: data.password,
      mobileNo: data.mobileNo,
      userType: data.userType,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  static async getUserInfo(mobileNo) {
    return await user.findOne({
      where: {
        mobileNo,
      },
    })
  }
  static async getInfo(userId) {
    return await user.findOne({
      where: {
        userId,
      },
      attributes: { exclude: ["password"] },
    })
  }
  static async editPwd(userId, password) {
    return await user.update(
      {
        password,
      },
      {
        where: { userId },
      }
    )
  }
  static async editUser(userId, data) {
    return await user.update(
      {
        mobileNo: data.mobileNo,
        qqCode: data.qqCode,
        qqEmail: data.qqEmail,
        phone: data.phone,
        github: data.github,
        idiograph: data.idiograph,
      },
      {
        where: { userId },
      }
    )
  }
}
//功能处理
class userController {
  //注册用户
  static async create(ctx) {
    const req = ctx.request.body
    if (req.mobileNo && req.password && req.userType) {
      try {
        const query = await userModule.getUserInfo(req.mobileNo)
        if (query) {
          ctx.response.status = 400
          ctx.body = {
            code: "400",
            desc: "用户已存在",
          }
        } else {
          const param = {
            mobileNo: req.mobileNo,
            password: req.password,
            userType: req.userType,
            createdAt: date.formatNowDate(),
            updatedAt: date.formatNowDate(),
          }
          const data = await userModule.userRegist(param)
          ctx.response.status = 200
          ctx.body = {
            code: 200,
            desc: "用户注册成功",
            userInfo: {
              mobileNo: req.mobileNo,
              userType: req.userType,
            },
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
  }
  //密码登陆
  static async login(ctx) {
    const req = ctx.request.body
    if (!req.mobileNo || !req.password) {
      return (ctx.body = {
        code: 400,
        msg: "用户名或密码不能为空",
      })
    } else {
      const data = await userModule.getUserInfo(req.mobileNo)
      if (data) {
        console.log(decrypt(data.password))
        if (decrypt(data.password) === decrypt(req.password)) {
          //生成token，验证登录有效期
          const token = jwt.sign(
            {
              userId: data.userId,
              user: data.mobileNo,
              passWord: data.password,
            },
            "1729625246",
            { expiresIn: expireTime }
          )
          const info = {
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            mobileNo: data.mobileNo,
            userId: data.userId,
            userType: data.userType,
          }
          return (ctx.body = {
            code: 200,
            token: token,
            userInfo: info,
            desc: "登陆成功",
          })
        } else {
          return (
            (ctx.status = 400),
            (ctx.body = {
              code: 400,
              desc: "用户密码错误",
            })
          )
        }
      } else {
        return (
          (ctx.status = 400),
          (ctx.body = {
            code: 400,
            desc: "该用户尚未注册",
          })
        )
      }
    }
  }
  //修改用户信息(除密码外)
  static async editUserInfo(ctx) {
    const req = ctx.request.body
    const token = ctx.headers.authorization
    if (token) {
      try {
        const result = await tools.verToken(token)
        let data = await userModule.editUser(result.userId, req)
        if (data) {
          ctx.status = 200
          return (ctx.body = {
            code: 200,
            desc: "修改成功",
          })
        }
      } catch (error) {
        ctx.status = 401
        return (ctx.body = {
          code: "401",
          desc: "登陆过期，请重新登陆",
        })
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
  static async getUserInfo(ctx) {
    const token = ctx.headers.authorization
    if (token) {
      try {
        const result = await tools.verToken(token)
        let data = await userModule.getInfo(result.userId)
        if (data) {
          ctx.status = 200
          return (ctx.body = {
            code: 200,
            data,
            desc: "ok",
          })
        }
      } catch (error) {
        ctx.status = 401
        return (ctx.body = {
          code: "401",
          desc: "登陆过期，请重新登陆",
        })
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
  static async getInfo(ctx) {
    let data = await userModule.getInfo(1)
    data.phone = data.phone.replace(data.phone.substring(3, 7), "****")
    ctx.status = 200
    return (ctx.body = {
      code: 200,
      data,
      desc: "获取成功",
    })
  }
  //修改密码
  static async editPassword(ctx) {
    const { password } = ctx.request.body
    const token = ctx.headers.authorization
    if (token) {
      try {
        const result = await tools.verToken(token)
        let data = await userModule.editPwd(result.userId, password)
        if (data) {
          ctx.status = 200
          return (ctx.body = {
            code: 200,
            desc: "修改密码成功",
          })
        } else {
          ctx.status = 400
          return (ctx.body = {
            code: 400,
            desc: "修改密码失败",
          })
        }
      } catch (error) {
        ctx.status = 401
        return (ctx.body = {
          code: "401",
          desc: "登陆过期，请重新登陆",
        })
      }
    } else {
      ctx.status = 401
      return (ctx.body = {
        code: "401",
        desc: "登陆过期，请重新登陆",
      })
    }
  }
}

module.exports = userController

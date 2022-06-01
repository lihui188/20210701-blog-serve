const Koa = require("koa")
const app = new Koa()
const views = require("koa-views")
const json = require("koa-json")
const onerror = require("koa-onerror")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const koajwt = require("koa-jwt")
const cors = require("koa-cors")
const koaBody = require("koa-body")

// 中间件设置文件上传
app.use(
	koaBody({
		multipart: true,
		formidable: {
			maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，设置200M
			multipart: true, // 是否支持 multipart-formdate 的表单
		},
	})
)
// token解析
const tools = require("./public/tool")
// 无需token接口
// const unrouter = require("./public/unrouter")

// 路由模块
const user = require("./routes/user")
const menu = require("./routes/menu")
const classify = require("./routes/classify")
const articles = require("./routes/articles")
const files = require("./routes/files_table")
const photos = require("./routes/photos")

// error handler
onerror(app)

// middlewares
app.use(
	bodyparser({
		enableTypes: ["json", "form", "text"],
	})
)
app.use(json())
app.use(logger())
app.use(require("koa-static")(__dirname + "/public"))
app.use(
	views(__dirname + "/views", {
		extension: "pug",
	})
)
app.use(
	cors({
		origin: function (ctx) {
			return "*"
		},
		exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
		maxAge: 5,
		allowMethods: ["GET", "POST", "DELETE"],
		allowHeaders: ["Content-Type", "Authorization", "Accept"],
	})
)
// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// logger
app.use(async (ctx, next) => {
	console.log(ctx)
	return next().catch((err) => {
		if (err.status === 401) {
			ctx.status = 401
			ctx.body = {
				code: 401,
				desc: "登陆过期，请重新登陆",
			}
		} else {
			throw err
		}
	})
})
const SECRET = "1729625246"
app.use(
	koajwt({
		secret: SECRET,
	}).unless({
		path: [
			/^\/api\/user\/register/,
			/^\/api\/user\/login/,
			/^\/api\/article\/list/,
			/^\/api\/article\/getclient/,
			/^\/api\/class\/list/,
			/^\/api\/user\/getInfo/,
			/^\/api\/file\/list/,
		],
	})
)
// routes
app.use(user.routes(), user.allowedMethods())
app.use(menu.routes(), menu.allowedMethods())
app.use(classify.routes(), classify.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(files.routes(), files.allowedMethods())
app.use(photos.routes(), photos.allowedMethods())

// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx)
})
module.exports = app

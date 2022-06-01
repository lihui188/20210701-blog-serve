const Router = require("koa-router")
const filesController = require("../controller/photos")

const router = new Router({
	prefix: "/api/photos",
})

//新增菜单
router.post("/uploadfile", filesController.uploadfile)
router.get("/page", filesController.page)
router.get("/list", filesController.list)
router.post("/del", filesController.del)
module.exports = router

const Router = require("koa-router")
const classifyController = require("../controller/classify")

const router = new Router({
  prefix: "/api/class",
})

//新增菜单
router.post("/add", classifyController.add)
router.post("/del", classifyController.del)
router.post("/edit", classifyController.edit)
router.get("/get/:id", classifyController.get)
router.get("/list", classifyController.list)
router.get("/page", classifyController.page)
module.exports = router

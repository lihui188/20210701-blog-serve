const Router = require("koa-router")
const articlesController = require("../controller/articles")

const router = new Router({
  prefix: "/api/article",
})

//新增菜单
router.post("/add", articlesController.add)
router.post("/del", articlesController.del)
router.post("/edit", articlesController.edit)
router.get("/get/:id", articlesController.get)
router.get("/getclient/:id", articlesController.getclient)
router.get("/page", articlesController.page)
router.get("/list", articlesController.list)
module.exports = router

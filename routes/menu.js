const Router = require('koa-router');
const menuController = require('../controller/menu')

const router = new Router({
    prefix: '/api/menu'
});

//新增菜单
router.post('/add',menuController.create)
router.get('/get',menuController.getMenuList)
//编辑菜单
/* router.post('/login',userController.login)
//删除菜单
router.post('/getUserInfo',userController.getUserInfo)
//查询菜单
router.post('/getUserInfo',userController.getUserInfo) */

module.exports = router;
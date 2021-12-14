const Router = require('koa-router');
const userController = require('../controller/user')

const router = new Router({
    prefix: '/api'
});

//用户注册
router.post('/user/register',userController.create)

//密码登陆
router.post('/user/login',userController.login)

//获取用户信息
router.get('/user/getUserInfo',userController.getUserInfo)
router.get('/user/getInfo',userController.getInfo)

router.post('/user/edit',userController.editUserInfo)
router.post('/user/editPwd',userController.editPassword)

module.exports = router;
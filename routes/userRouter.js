const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const auth = require('../middleware/auth')

router.post('/register',userControllers.register)

router.post('/login',userControllers.login)

router.get('/logout',userControllers.logout)

router.get('/refresh_token',userControllers.refreshToken)

router.patch('/addcart', auth, userControllers.addCart)

router.get('/history', auth, userControllers.history)

router.get('/infor', auth ,userControllers.getUser )


module.exports  = router
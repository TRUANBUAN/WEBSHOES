const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get(auth, authAdmin, paymentController.getPayment)
    .post(auth, paymentController.createPayment)


module.exports = router

 
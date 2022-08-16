const express = require('express')
const authController = require('../controller/authController')
const paymentController = require('../controller/paymentController')

const router = express.Router()

router.route('/account-statement').get(authController.protect, paymentController.Account_statement)

module.exports = router
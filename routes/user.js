const express = require('express')
const authController = require('../controller/authController')
const userController = require('../controller/userController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/createPin').post(authController.protect,userController.createPin)
router.route('/profile').get(authController.protect,userController.getUser)
router.route('/deposit').post(authController.protect, userController.deposit)
router.route('/withdraw').post(authController.protect, userController.withdraw)
router.route('/transfer').post(authController.protect, userController.transfer)

router.get("/All",userController.AllUser)
module.exports = router
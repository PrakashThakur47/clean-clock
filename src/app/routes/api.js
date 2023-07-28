const router = require('express').Router()

const authController = require('../controller/api/authController')

router.post('/login', authController.phoneLogin)

module.exports = router
const router = require('express').Router()

const authController = require('../controller/api/authController')

router.post('/login', authController.phoneLogin)
router.post('/create-update-group', groupControl)
module.exports = router
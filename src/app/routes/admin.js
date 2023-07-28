const router = require('express').Router()
const validations = require('../middlewares/validations')
const authController = require('../controller/admin/authController')
const GroupController = require('../controller/admin/groupController')


router.post('/login',authController.login)
router.post('/create-update-group', GroupController.createUpdateGroup)


module.exports = router
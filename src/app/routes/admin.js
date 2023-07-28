const router = require('express').Router()
const validations = require('../middlewares/validations')
const authController = require('../controller/admin/authController')
const GroupController = require('../controller/admin/groupController')


router.post('/login',authController.login)
router.post('/create-update-group', GroupController.createUpdateGroup)
router.post('/fetch-group', GroupController.fetchGroupsByStatus)
router.post('/approve-group-request', GroupController.approveRequest)
router.post('/delete-group', GroupController.disableGroup)

module.exports = router
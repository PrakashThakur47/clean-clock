const router = require('express').Router()

const authController = require('../controller/api/authController')
const isAuth = require('../middlewares/isAuth')

router.post('/login', authController.phoneLogin)
router.post('/onboard-user', isAuth, authController.onboardUser)
router.post('/add-group', isAuth, authController.addGroup)
router.get('/user-profile', isAuth, authController.userProfile)
router.post('/get-groups', isAuth, authController.getGroups)


module.exports = router
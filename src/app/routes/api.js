const router = require('express').Router()

const authController = require('../controller/api/authController')
const isAuth = require('../middlewares/isAuth')

router.post('/login', authController.phoneLogin)
router.post('/onboard-user', isAuth, authController.onboardUser)
router.post('/add-group', isAuth, authController.addGroup)
router.get('/user-profile', isAuth, authController.userProfile)
router.post('/get-groups', isAuth, authController.getGroups)

router.get('/dashboard', isAuth, authController.dashboard)
router.post('/reset-streak', isAuth, authController.resetStreak)

router.post('/get-group-details', isAuth, authController.getGroupDetails)


module.exports = router
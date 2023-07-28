const { body, validationResult } = require('express-validator')
const Constants = require('../../config/constants')


exports.adminLoginRules = () => {
  return [
    body('email').not().isEmpty().isEmail(),
    body('password').not().isEmpty().isLength({ min: 8 })
  ]
}


exports.validate = (request, _response, next) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      throw new Error(Constants[100])
    }
    next()
  } catch (error) {
    next(error)
  }
}

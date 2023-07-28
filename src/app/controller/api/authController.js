const UserService = require('../../../service/userService')
const responder = require('../../../util/responder')
const firebase = require('../../../util/firebase')
const LoginResponse = require('../../../resource/api/LoginResponse')

/**
 *
 * @param request
 * @param response
 * @param next
 */
exports.phoneLogin = async (request, response, next) => {
  try {
    const firebaseToken = request.get('firebaseToken')

    const decodedToken = await firebase.getUserDataByToken(firebaseToken)

    const payload = {
      firebase_uid: decodedToken.user_id,
      phone_number: decodedToken.phone_number
    }
    const user = await UserService.findOrCreateUser(payload)

    return responder(request, response, next, true, 100, new LoginResponse(user).exec())
  } catch (error) {
    next(error)
  }
}

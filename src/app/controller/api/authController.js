const UserService = require('../../../service/userService')
const responder = require("../../../util/responder")
const firebase = require('../../../util/firebase')
const LoginResponse = require('../../../resource/api/LoginResponse')

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


exports.onboardUser = async (request, response, next) => {
  try {
    const userId = request.user.userId;
    const {first_name, last_name, email, profession, age} = request.body;

    const data = {
      first_name,
      last_name,
      email,
      profession,
      age,
      is_onboarded: true
    }
    const user = await UserService.updateUserDetails(userId, data)

    return responder(request, response, next, true, 100, user)
  } catch (error) {
    next(error)
  }
}

exports.addGroup = async (request, response, next) => {
  try {
    const userId = request.user.userId;
    const {addiction_duration, freq, craving_time, group_id} = request.body;

    const data = {
      group_details: {
        addiction_duration,
        freq,
        craving_time,
      },
      group_id,
      user_id: userId
    }
    const user = await UserService.createUserGroupDetails(data)
    await UserService.updateUserDetails({_id: userId}, {group_exist: true})

    return responder(request, response, next, true, 100, user)
  } catch (error) {
    next(error)
  }
}
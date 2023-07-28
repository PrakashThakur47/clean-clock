const UserService = require('../../../service/userService')
const responder = require("../../../util/responder")
const firebase = require('../../../util/firebase')
const LoginResponse = require('../../../resource/api/LoginResponse')
const UserResponse = require('../../../resource/api/UserProfileResponse.js')
const GroupService = require('../../../service/groupService');
const GroupListResponse = require('../../../resource/api/GroupListResponse');

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
    const { first_name, last_name, email, profession, age } = request.body;

    const data = {
      first_name,
      last_name,
      email,
      profession,
      age,
      is_onboarded: true
    }
    const user = await UserService.updateUserDetails(userId, data)

    return responder(request, response, next, true, 119, user)
  } catch (error) {
    next(error)
  }
}

exports.addGroup = async (request, response, next) => {
  try {
    const userId = request.user.userId;
    const { addiction_duration, freq, craving_time, group_id } = request.body;

    const data = {
      group_details: {
        addiction_duration,
        freq,
        craving_time,
      },
      group_id,
      user_id: userId,
      total_streak: 90,
      current_streak: 0
    }
    const user = await UserService.createUserGroupDetails(data)
    await UserService.updateUserDetails({ _id: userId }, { group_exist: true })

    return responder(request, response, next, true, 100, user)
  } catch (error) {
    next(error)
  }
}


exports.dashboard = async (request, response, next) => {
  try {
    const userId = request.user.userId;

    const user = await UserService.getUserGroupDetails(userId)
    console.log('user => ', user)

    return responder(request, response, next, true, 100, user)
  } catch (error) {
    next(error)
  }
}

exports.userProfile = async (request, response, next) => {
  try {
    const user_id = request.user.userId;
    const fetchUserUserProfile = await UserService.userProfile(user_id)
    if (!fetchUserUserProfile.length)
      return responder(request, response, next, true, 121, {})

    return responder(request, response, next, true, 120, UserResponse.collection(fetchUserUserProfile))
  } catch (error) {
    console.log(error)
    next(error)
  }
}


exports.resetStreak = async (request, response, next) => {
  try {
    const userId = request.user.userId;

    await UserService.resetStreak(userId, request.body.group_id)

    return responder(request, response, next, true, 100, { data: 'updated' })
  } catch (error) {
    next(error)
  }
}


exports.getGroupDetails = async (request, response, next) => {
  try {
    const userId =  request.user.userId;

    const group = await UserService.getGroupDetails(userId, request.body.group_id)

    return responder(request, response, next, true, 100, group)
  } catch (error) {
    next(error)
  }
}

exports.getGroups = async (request, response, next) => {
  try {
    const groupsFetched = await GroupService.fetchGroup(request.body)
    if (!groupsFetched.groupsFetched.length)
      return responder(request, response, next, true, 111, {})

    return responder(request, response, next, true, 112, { total: groupsFetched.count, groups: GroupListResponse.collection(groupsFetched.groupsFetched) })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
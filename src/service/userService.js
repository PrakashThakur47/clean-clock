const User = require('../model/User')

/**
 *
 * @param data
 */
exports.findOrCreateUser = async data => {
  let user = await User.findOne({ contact: data.phone_number })

  if (!user) { user = await createUserWithContactNumber(data.phone_number) }

  return user
}

const createUserWithContactNumber = async contactNumber => {
  const user = new User({ contact: contactNumber })
  return user.save() ? user : false
}

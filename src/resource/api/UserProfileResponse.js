const Resource = require('resources.js')

/**
 */
class UserResponse extends Resource {
  toArray () {
    let fullName = this?.first_name + ' ' + this?.last_name
    return {
      name: fullName,
      email: this.email,
      profile_pic : this?.profile_picture,
    }
  }
}

module.exports = UserResponse

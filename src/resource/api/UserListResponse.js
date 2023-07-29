const Resource = require('resources.js')

/**
 */
class UserResponse extends Resource {
    toArray() {
        let fullName = this?.first_name + ' ' + this?.last_name
        return {
            id: this._id,
            name: fullName,

        }
    }
}

module.exports = UserResponse

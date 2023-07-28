const Resource = require('resources.js')

/**
 */
class GroupResponse extends Resource {
    toArray() {
        return {
            id: this._id,
            name: this.name,
            user_count: this.total_user,

        }
    }
}

module.exports = GroupResponse

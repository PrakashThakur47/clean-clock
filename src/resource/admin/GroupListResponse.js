const Resource = require('resources.js')

class GroupListResponse extends Resource {
    toArray() {
        console.log(this)
        const created = new Date(this.createdAt).toLocaleDateString()
        return {
            id: this._id,
            name: this.name,
            description: this.description,
            createdAt : created,
            is_disabled: !!this.is_disabled
        }
    }
}

module.exports = GroupListResponse
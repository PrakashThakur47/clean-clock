const Resource = require('resources.js')

class GroupListResponse extends Resource {
    toArray() {
        const created = new Date(this.createdAt).toLocaleDateString()
        return {
            id: this._id,
            name: this.name,
            description: this.description,
            createdAt : created
        }
    }
}

module.exports = GroupListResponse
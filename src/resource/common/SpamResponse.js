const Resource = require("resources.js");
const PostService = require("../../service/postService");

/**
 */
class SpamResponse extends Resource {
  /**
   *
   */
  toArray() {
    return {
      id: this.id,
      description: this.description,
      post: this.post_id,
      user: this.user_id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

module.exports = SpamResponse;

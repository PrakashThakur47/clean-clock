const Resource = require("resources.js");

/**
 */
class PostResponse extends Resource {
  /**
   *
   */
  toArray() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      slug: this.slug,
      spam_count: Number(this.spam_count),
      user: this.user_id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

module.exports = PostResponse;

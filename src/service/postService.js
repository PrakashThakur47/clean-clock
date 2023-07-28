const Post = require("../model/Post");
const Helpers = require("../util/helpers");

/**
 *
 * @param data
 */
exports.postCreate = async (data, userId) => {
  const post_slug = Helpers.slugify(data.title);
  return await Post.create({ ...data, slug: post_slug, user_id: userId });
};

/**
 *
 */
exports.postGet = async (post_id = null) => {
  if (post_id) {
    return await Post.findOne({ _id: post_id }).populate("user_id");
  }
  return await Post.find({}).populate("user_id");
};

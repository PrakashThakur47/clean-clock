const Spam = require("../model/Spam");

/**
 *
 * @param data
 */
exports.spamCreate = async (data, userId = null) => {
  return await Spam.create({ ...data, user_id: userId });
};

/**
 *
 */
exports.spamGet = async (spam_id = null) => {
  if (spam_id) {
    return await Spam.findOne({ _id: spam_id }).populate(["post_id", "user_id"]);
  }
  return await Spam.find({}).populate(["post_id", "user_id"]);
};

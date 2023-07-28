const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = Schema(
  {
    title: { type: String },
    description: { type: String },
    slug: { type: String, required: false },
    spam_count: { type: Number, default: 0 },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

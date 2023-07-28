const mongoose = require("mongoose");
const { Schema } = mongoose;

const SpamSchema = Schema(
  {
    description: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: false },
    post_id: { type: Schema.Types.ObjectId, ref: "Post", required: false },
  },
  { timestamps: true }
);

const Spam = mongoose.model("Spam", SpamSchema);
module.exports = Spam;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postText: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: 0,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

const mongoose = require('mongoose');

const subredditSchema = new mongoose.Schema(
  {
    subredditName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    followedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followerCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
const subgreddiit = mongoose.model("Subreddit", subredditSchema);
module.exports = {subgreddiit};
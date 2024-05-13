const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: { type: Schema.Types.ObjectId, ref: "polidemocracyusers" },
  tags: {
    type: [String], // Array of strings for tags
    default: [], // Default empty array
  },
  likes: {
    type: Number,
    default: 0,
    // required:true
  },
  view: {
    type: Number,
    default: 0,
    // required:true
  },
  bookmark: {
    type: Number,
    default: 0,
    // required:true
  },
  dislike: {
    type: Number,
    default: 0,
    // required:true
  },
  answers: [
    {
      answer: String,
      user: { type: Schema.Types.ObjectId, ref: "polidemocracyusers" },

      like: {
        type: Number,
        default: 0,
        // required:true
      },
      dislike: {
        type: Number,
        default: 0,
        // required:true
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Post = mongoose.model("polidemocracyPosts",postSchema);
module.exports = Post;

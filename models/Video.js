const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Cannot add comments without username"],
    },
    comment: {
      type: String,
      required: [true, "Cannot add blank comments"],
    },
  },
  { timestamps: true }
);

const VideoSchema = new mongoose.Schema(
  {
    channelDisplayPic: {
      type: String,
    },
    channelName: {
      type: String,
      required: "Channel name is required",
    },
    subscribers: {
      type: String,
      required: "Subscribers count is required",
    },
    title: {
      type: String,
      required: "Title Is required to add a video",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    videoId: {
      type: String,
      required: "Video ID is required to play a video",
    },
    uploadDate: {
      type: String,
      required: "Video upload date is required",
    },
    likeCount: {
      type: String,
      required: "Video like count is required",
    },
    dislikeCount: {
      type: String,
      required: "Video dislike count is required",
    },
    viewCount: {
      type: String,
      required: "Video view count is required",
    },
    category: {
      type: String,
      required: "Video category is required",
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);

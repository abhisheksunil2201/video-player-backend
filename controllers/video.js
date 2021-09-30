const Video = require("../models/Video");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    res.status(200).json({ success: true, video });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

const postComment = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;
  try {
    let video = await Video.findById(videoId);
    video.comments.push({
      user: id,
      name: req.body.name,
      comment: req.body.comment,
    });
    video = await video.save();
    const allVideos = await Video.find({});
    res
      .status(200)
      .json({ success: true, message: "Comment added", allVideos });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to add comment" });
  }
};

const deleteComment = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;
  const commentId = req.params.commentId;
  const isAdmin = req.body.isAdmin;

  try {
    let video = await Video.findById(videoId);
    video.comments.splice(
      video.comments.findIndex(
        (item) => item._id === commentId && (item.user == id || isAdmin)
      ),
      1
    );
    video = await video.save();
    const allVideos = await Video.find({});
    res
      .status(200)
      .json({ success: true, message: "Comment deleted", allVideos });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to delete comment" });
  }
};

const postVideo = async (req, res) => {
  try {
    const newVideo = new Video({
      channelDisplayPic: req.body.channelDisplayPic,
      channelName: req.body.channelName,
      subscribers: req.body.subscribers,
      title: req.body.title,
      description: req.body.description,
      videoId: req.body.videoId,
      uploadDate: req.body.uploadDate,
      likeCount: req.body.likeCount,
      dislikeCount: req.body.dislikeCount,
      viewCount: req.body.viewCount,
      category: req.body.category,
    });
    const video = await newVideo.save();
    res.status(200).json({ success: true, video });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Could not create new video" });
  }
};

module.exports = {
  getAllVideos,
  getVideo,
  postComment,
  deleteComment,
  postVideo,
};

const Like = require("../models/Like");

const getLiked = async (req, res) => {
  const id = req.user.userId;
  try {
    let likedPlaylist = await Like.findOne({ user: id });
    likedPlaylist = await likedPlaylist.populate("videos");
    res.status(200).json({ success: true, likedPlaylist });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: "Failed to fetch liked videos" });
  }
};

const addToLiked = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let likedPlaylist = await Like.findOne({ user: id });
    const isVideoPresent = likedPlaylist.videos.includes(videoId);

    if (!isVideoPresent) {
      likedPlaylist.videos.push({ _id: videoId });
    } else {
      likedPlaylist.videos.pull({ _id: videoId });
    }

    likedPlaylist = await likedPlaylist.save();
    likedPlaylist = await likedPlaylist.populate("videos");
    res.status(200).json({ success: true, likedPlaylist });
  } catch (err) {
    res.status(400).json({ success: false, msg: "Failed to like video" });
  }
};

const removeFromLiked = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let likedPlaylist = await Like.findOne({ user: id });
    const isVideoPresent = likedPlaylist.videos.includes(videoId);

    if (isVideoPresent) {
      likedPlaylist.videos.pull({ _id: videoId });
    }

    likedPlaylist = await likedPlaylist.save();
    likedPlaylist = await likedPlaylist.populate("videos");

    res.status(200).json({
      success: true,
      message: "Video unliked successfully",
      likedPlaylist,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to unlike the video" });
  }
};

module.exports = {
  getLiked,
  addToLiked,
  removeFromLiked,
};

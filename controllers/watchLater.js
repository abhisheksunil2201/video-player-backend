const WatchLater = require("../models/WatchLater");

const getWatchLater = async (req, res) => {
  const id = req.user.userId;
  try {
    let watchLaterPlaylist = await WatchLater.findOne({ user: id });
    watchLaterPlaylist = await watchLaterPlaylist.populate("videos");
    res.status(200).json({ success: true, watchLaterPlaylist });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: "Failed to fetch watch later playlist" });
  }
};

const addToWatchLater = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let watchLaterPlaylist = await WatchLater.findOne({ user: id });
    const isVideoPresent = watchLaterPlaylist.videos.includes(videoId);

    if (!isVideoPresent) {
      watchLaterPlaylist.videos.push({ _id: videoId });
    } else {
      watchLaterPlaylist.videos.pull({ _id: videoId });
    }

    watchLaterPlaylist = await watchLaterPlaylist.save();
    watchLaterPlaylist = await watchLaterPlaylist.populate("videos");
    res.status(200).json({ success: true, watchLaterPlaylist });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: "Failed to add video to watch later" });
  }
};

const removeFromWatchLater = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let watchLaterPlaylist = await WatchLater.findOne({ user: id });
    const isVideoPresent = watchLaterPlaylist.videos.includes(videoId);

    if (isVideoPresent) {
      watchLaterPlaylist.videos.pull({ _id: videoId });
    }
    watchLaterPlaylist = await watchLaterPlaylist.save();
    watchLaterPlaylist = await watchLaterPlaylist.populate("videos");
    res.status(200).json({
      success: true,
      message: "Video removed from watch later",
      watchLaterPlaylist,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Could not remove the video from watch later",
    });
  }
};

module.exports = {
  getWatchLater,
  addToWatchLater,
  removeFromWatchLater,
};

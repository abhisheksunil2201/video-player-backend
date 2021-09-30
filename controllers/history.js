const History = require("../models/History");

const getHistory = async (req, res) => {
  const id = req.user.userId;
  try {
    let history = await History.findOne({ user: id });
    history = await history.populate("videos");
    res.status(200).json({ success: true, history });
  } catch (err) {
    res.status(400).json({ status: false, msg: "Failed to fetch history" });
  }
};

const addToHistory = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let history = await History.findOne({ user: id });
    const isVideoPresent = history.videos.includes(videoId);

    if (!isVideoPresent) {
      history.videos.push({ _id: videoId });
    } else {
      history.videos.pull({ _id: videoId });
      history.videos.unshift({ _id: videoId });
    }

    history = await history.save();
    history = await history.populate("videos");
    res.status(200).json({ success: true, history });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: "Failed to add video to history" });
  }
};

const removeFromHistory = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let history = await History.findOne({ user: id });
    const isVideoPresent = history.videos.includes(videoId);

    if (isVideoPresent) {
      history.videos.pull({ _id: videoId });
    }
    await history.save();

    history = await history.save();
    history = await history.populate("videos");

    res
      .status(200)
      .json({ success: true, message: "Video deleted from history", history });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Could not delete the video from history",
    });
  }
};

module.exports = {
  getHistory,
  addToHistory,
  removeFromHistory,
};

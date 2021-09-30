const Like = require("../models/Like");
const History = require("../models/History");
const WatchLater = require("../models/WatchLater");

const createLikePlaylist = async (req, res, next) => {
  const id = req.user.userId;
  try {
    const playlist = await Like.findOne({ user: id });
    if (!playlist) {
      try {
        const newLikedPlaylist = await new Like({
          user: id,
          name: "Liked Videos",
        });

        await newLikedPlaylist.save();
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.message,
          message: "Could not create liked videos playlist",
        });
      }
      next();
    } else {
      await playlist.populate("videos");
      next();
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.message,
      message: "Could not find liked videos playlist",
    });
  }
};

const createWatchLaterPlaylist = async (req, res, next) => {
  const id = req.user.userId;
  try {
    const playlist = await WatchLater.findOne({ user: id });
    if (!playlist) {
      try {
        const newWatchLaterPlaylist = await new WatchLater({
          user: id,
          name: "Watch Later Videos",
        });

        await newWatchLaterPlaylist.save();
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.message,
          message: "Could not create Watch Later playlist",
        });
      }
      next();
    } else {
      await playlist.populate("videos");
      next();
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.message,
      message: "Could not find Watch Later playlist",
    });
  }
};

const createHistoryPlaylist = async (req, res, next) => {
  const id = req.user.userId;
  try {
    const playlist = await History.findOne({ user: id });
    if (!playlist) {
      try {
        const newHistory = await new History({
          user: id,
          name: "History",
        });

        await newHistory.save();
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.message,
          message: "Could not create history",
        });
      }
      next();
    } else {
      await playlist.populate("videos");
      next();
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.message,
      message: "Could not find history",
    });
  }
};

module.exports = {
  createLikePlaylist,
  createWatchLaterPlaylist,
  createHistoryPlaylist,
};

const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/AuthVerification");
const {
  createWatchLaterPlaylist,
} = require("../middleware/createDefaultPlaylist");
const {
  getWatchLater,
  addToWatchLater,
  removeFromWatchLater,
} = require("../controllers/watchLater");

router.use("/", authToken);
router.use("/", createWatchLaterPlaylist);

router.get("/", getWatchLater);
router.post("/:videoId", addToWatchLater);
router.delete("/:videoId", removeFromWatchLater);

module.exports = router;

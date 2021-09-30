const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/AuthVerification");
const {
  createHistoryPlaylist,
} = require("../middleware/createDefaultPlaylist");
const {
  getHistory,
  addToHistory,
  removeFromHistory,
} = require("../controllers/history");

router.use("/", authToken);
router.use("/", createHistoryPlaylist);

router.get("/", getHistory);
router.post("/:videoId", addToHistory);
router.delete("/:videoId", removeFromHistory);

module.exports = router;

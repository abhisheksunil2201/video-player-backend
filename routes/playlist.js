const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/AuthVerification");
const {
  createPlaylist,
  getPlaylists,
  getSinglePlaylist,
  addToPlaylist,
  removeFromPlaylist,
  removePlaylist,
} = require("../controllers/playlist");

router.use("/", authToken);

router.get("/", getPlaylists);
router.get("/:playlistId", getSinglePlaylist);
router.post("/", createPlaylist);
router.post("/:playlistId/:videoId", addToPlaylist);
router.delete("/:playlistId", removePlaylist);
router.delete("/:playlistId/:videoId", removeFromPlaylist);

module.exports = router;

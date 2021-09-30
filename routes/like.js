const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/AuthVerification");
const { createLikePlaylist } = require("../middleware/createDefaultPlaylist");
const {
  getLiked,
  addToLiked,
  removeFromLiked,
} = require("../controllers/like");

router.use("/", authToken);
router.use("/", createLikePlaylist);

router.get("/", getLiked);
router.post("/:videoId", addToLiked);
router.delete("/:videoId", removeFromLiked);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  getVideo,
  postComment,
  deleteComment,
  postVideo,
} = require("../controllers/video");
const { authToken } = require("../middleware/AuthVerification");

router.get("/", getAllVideos);
router.post("/", postVideo);
router.get("/:videoId", getVideo);
router.post("/comment/:videoId", authToken, postComment);
router.post("/comment/:videoId/:commentId", authToken, deleteComment);

module.exports = router;

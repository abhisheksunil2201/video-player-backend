const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectMongoDb = require("./controllers/connectMongoDb");
const videoRoute = require("./routes/video");
const userRoute = require("./routes/user");
const playlistRoute = require("./routes/playlist");
const likedPlaylistRoute = require("./routes/like");
const watchLaterPlaylistRoute = require("./routes/watchLater");
const historyRoute = require("./routes/history");
const categoryRoute = require("./routes/category");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectMongoDb();

app.get("/", (req, res) => {
  res.status(200).json({
    response: "Video Library Backend",
    success: true,
  });
});

app.use("/videos", videoRoute);
app.use("/user", userRoute);
app.use("/likedvideos", likedPlaylistRoute);
app.use("/watchlater", watchLaterPlaylistRoute);
app.use("/history", historyRoute);
app.use("/playlist", playlistRoute);
app.use("/category", categoryRoute);

//Error routes handler
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

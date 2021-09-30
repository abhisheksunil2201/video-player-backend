const jwt = require("jsonwebtoken");

exports.authToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized Access" });
  }
};

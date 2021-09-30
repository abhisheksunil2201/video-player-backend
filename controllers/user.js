const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { firstName, email, password, isAdmin } = req.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists, Please Login",
      });
    }
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({ success: false, error: err });
        } else {
          const userCreds = new User({
            firstName,
            email,
            isAdmin: isAdmin,
            password: hash,
          });
          await userCreds.save();
          res.status(201).json({
            success: true,
            message: "Account created",
          });
        }
      });
    } catch (err) {
      res.status(400).json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Email Doesn't Exist, Create An Account!",
      });
    }

    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication Failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          { userId: foundUser._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );

        const user = {
          token,
          name: foundUser.firstName,
          id: foundUser._id,
          isAdmin: foundUser.isAdmin,
        };

        return res
          .status(200)
          .json({ success: true, message: "Authentication Successful", user });
      }

      res
        .status(401)
        .json({ success: false, message: "Password is Incorrect" });
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication Failed" });
  }
};

module.exports = {
  signUp,
  login,
};

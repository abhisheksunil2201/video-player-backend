const mongoose = require("mongoose");

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First name is a required field",
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: "Email is a required field.",
      validate: {
        validator: (email) => emailRegex.test(email),
        message: "must be a valid email address",
      },
    },
    password: {
      type: String,
      required: "Password is a required field",
    },
    isAdmin: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

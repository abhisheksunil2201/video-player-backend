const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Category", CategorySchema);

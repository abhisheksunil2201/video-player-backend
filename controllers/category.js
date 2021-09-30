const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json({ success: true, category });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Could not find category" });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      category: req.body.category,
      categoryImage: req.body.categoryImage,
    });
    const category = await newCategory.save();
    res.status(200).json({ success: true, category });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Could not create new category" });
  }
};

module.exports = {
  getCategories,
  createCategory,
};

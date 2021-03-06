const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredient: { type: Array, required: true },
  recipe: { type: String, required: true },
  image: { type: Object, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("recipe", recipeSchema);

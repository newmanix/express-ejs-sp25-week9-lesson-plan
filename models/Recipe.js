// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  description: String,
  ingredients: String,
  instructions: String,
  rating: { type: Number, min: 0, max: 5 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: String // This will be the filename (e.g., 6627d5e61d13e17366c26a41.jpg)
});

module.exports = mongoose.model('Recipe', recipeSchema);

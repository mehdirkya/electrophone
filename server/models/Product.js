const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  specs: [String], // ou objet pour détails techniques
  highlights: [String],
});

module.exports = mongoose.model("Product", productSchema);
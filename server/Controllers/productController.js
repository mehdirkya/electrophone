import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";

// Create a new product with optional image and specs
export const addProduct = async (req, res) => {
  try {
    const { name, brand, price, description, category, inStock, newArrival } = req.body;

    let specs = [];
    if (req.body.specs) {
      specs = typeof req.body.specs === "string" ? JSON.parse(req.body.specs) : req.body.specs;
    }

    const imageUrl = req.file?.path || "";
    const imageId = req.file?.filename || "";

    const newProduct = new Product({
      name,
      brand,
      price,
      description,
      category,
      inStock,
      newArrival,  // <-- include newArrival here
      imageUrl,
      imageId,
      specs,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};


// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Delete a product (and image from Cloudinary)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete Cloudinary image if it exists
    if (product.imageId) {
      await cloudinary.uploader.destroy(product.imageId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
export const getFilteredProducts = async (req, res) => {
  try {
    const { category, brand } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};


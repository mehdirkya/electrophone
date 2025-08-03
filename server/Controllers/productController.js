import Product from "../models/Product.js";


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


export const getFilteredProducts = async (req, res) => {
  try {
    const { category, brand, page = 1, limit = 9 } = req.query;

    const filter = {};
    if (category) filter.category = category;

    if (brand) {
      // brand can be comma separated list
      const brandsArray = brand.split(",");
      filter.brand = { $in: brandsArray };
    }

    // Convert page and limit to numbers and set skip for pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const productsPromise = Product.find(filter).skip(skip).limit(limitNum);
    const countPromise = Product.countDocuments(filter);

    // Run queries in parallel
    const [products, total] = await Promise.all([productsPromise, countPromise]);

    res.status(200).json({ products, total });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Assuming you have access to express router

export const getBrandsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    const brands = await Product.distinct("brand", { category });
    res.status(200).json(brands);  // This should be an array of strings
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch brands", error: err.message });
  }
};


// Get one product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};
export const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const currentProduct = await Product.findById(id);

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { brand, category } = currentProduct;

    // Exclude current product
    const excludeSelf = { _id: { $ne: id } };

    // 1. Same brand + category
    const sameBrandCategory = await Product.find({
      ...excludeSelf,
      brand,
      category,
    }).limit(4);

    if (sameBrandCategory.length >= 4) {
      return res.json(sameBrandCategory.slice(0, 4));
    }

    // 2. Same brand (other categories)
    const sameBrand = await Product.find({
      ...excludeSelf,
      brand,
      category: { $ne: category },
    });

    // 3. Same category (other brands)
    const sameCategory = await Product.find({
      ...excludeSelf,
      category,
      brand: { $ne: brand },
    });

    // Combine and fill up to 4
    const combined = [
      ...sameBrandCategory,
      ...sameBrand,
      ...sameCategory.sort(() => 0.5 - Math.random()),
    ];

    res.json(combined.slice(0, 4));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch related products", error: err.message });
  }
};


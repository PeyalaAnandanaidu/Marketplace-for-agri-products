const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Public (should be protected in production)
exports.addProduct = async (req, res) => {
  const { name, price, image, description } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      image,
      description
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
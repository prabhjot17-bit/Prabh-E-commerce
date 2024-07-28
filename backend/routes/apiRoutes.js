const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

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


// @desc    Get product by ID
// @route   GET /api/products/:id
router.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.json({ message:"some error occured or product not found"});
    }
  });
  

module.exports = router;

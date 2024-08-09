const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Some error occurred or product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Some error occurred or product not found" });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories.filter(Boolean)); // Filter out any null categories
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ message: 'Login successful', token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/categories/:category', async (req, res) => {
  const { newCategory } = req.body;

  if (!newCategory) {
    return res.status(400).json({ message: 'New category name is required' });
  }

  try {
    const result = await Product.updateMany(
      { category: req.params.category },
      { $set: { category: newCategory } }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Category updated' });
    } else {
      res.status(404).json({ message: 'Category not found or no products updated' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/categories/:category', async (req, res) => {
  try {
    const result = await Product.updateMany(
      { category: req.params.category },
      { $unset: { category: "" } }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Category deleted and set to null in products' });
    } else {
      res.status(404).json({ message: 'Category not found or no products updated' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../../../shared/middleware/auth');

// Get all products
router.get('/', auth(), async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product by ID
router.get('/:id', auth(), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create new product
router.post('/', auth(), async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      stock
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

module.exports = router;

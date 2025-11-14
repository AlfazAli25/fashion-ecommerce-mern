const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    const products = await Product.find(query).populate('seller', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ message: 'Only sellers can add products' });
    const { name, description, price, category, size, color, stock } = req.body;
    const product = new Product({
      name, description, price, category,
      size: JSON.parse(size || '[]'),
      color: JSON.parse(color || '[]'),
      image: req.file ? `/uploads/${req.file.filename}` : '',
      stock, seller: req.user.userId
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.seller.toString() !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });

    const { name, description, price, category, size, color, stock } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.size = size ? JSON.parse(size) : product.size;
    product.color = color ? JSON.parse(color) : product.color;
    product.stock = stock !== undefined ? stock : product.stock;
    if (req.file) product.image = `/uploads/${req.file.filename}`;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.seller.toString() !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/seller/my-products', auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

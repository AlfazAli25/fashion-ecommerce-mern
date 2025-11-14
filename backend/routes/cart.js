const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    let cart = await Cart.findOne({ user: req.user.userId });
    
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(item => 
      item.product.toString() === productId && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size, color });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/clear', auth, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

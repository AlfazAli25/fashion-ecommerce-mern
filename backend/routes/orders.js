const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = new Order({
      buyer: req.user.userId,
      items,
      totalAmount,
      shippingAddress
    });
    
    await order.save();
    await Cart.findOneAndDelete({ user: req.user.userId });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.userId }).populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/seller-orders', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') return res.status(403).json({ message: 'Access denied' });
    const orders = await Order.find({ 'items.product': { $exists: true } })
      .populate('items.product buyer')
      .sort({ createdAt: -1 });
    
    const sellerOrders = orders.filter(order => 
      order.items.some(item => item.product?.seller?.toString() === req.user.userId)
    );
    res.json(sellerOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

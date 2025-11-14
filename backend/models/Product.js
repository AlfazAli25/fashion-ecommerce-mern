const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  size: [{ type: String }],
  color: [{ type: String }],
  image: { type: String, required: true },
  images: [{ color: String, url: String }],
  stock: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

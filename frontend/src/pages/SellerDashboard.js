import React, { useState, useEffect } from 'react';
import API, { API_BASE_URL } from '../utils/api';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: 'Men',
    size: '', color: '', stock: '', image: null
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products/seller/my-products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/seller-orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'size' || key === 'color') {
        form.append(key, JSON.stringify(formData[key].split(',').map(s => s.trim())));
      } else if (formData[key]) {
        form.append(key, formData[key]);
      }
    });

    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, form);
      } else {
        await API.post('/products', form);
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', category: 'Men', size: '', color: '', stock: '', image: null });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      size: product.size.join(', '),
      color: product.color.join(', '),
      stock: product.stock,
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Seller Dashboard</h1>
          <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition">
            Add New Product
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b-2">
          <button
            className={`px-8 py-4 font-semibold transition ${activeTab === 'products' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('products')}
          >
            My Products ({products.length})
          </button>
          <button
            className={`px-8 py-4 font-semibold transition ${activeTab === 'orders' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <p className="text-xl text-gray-600">No products yet. Add your first product!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <img src={product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.category}</p>
                    <p className="text-2xl font-bold text-indigo-600 mb-2">${product.price}</p>
                    <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:-translate-y-1 transition">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <p className="text-xl text-gray-600">No orders yet</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
                    <div>
                      <p className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</p>
                      <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold text-sm capitalize">
                      {order.status}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <img src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`} alt={item.product?.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">{item.product?.name}</h4>
                          <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-indigo-600 text-lg">${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
            <div className="bg-white p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    placeholder="S, M, L, XL"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Colors (comma separated)</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    placeholder="Red, Blue, Black"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    required={!editingProduct}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;

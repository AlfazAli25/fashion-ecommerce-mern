import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import API, { API_BASE_URL } from '../utils/api';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const total = cart?.items?.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  ) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderItems = cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.product.price
      }));

      await API.post('/orders', {
        items: orderItems,
        shippingAddress: address
      });

      clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Address</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({...address, state: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) => setAddress({...address, country: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
                  />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition mt-4">
                Place Order
              </button>
            </div>
          </form>
          
          <div className="bg-white p-8 rounded-xl shadow-lg h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart?.items?.map(item => (
                <div key={item._id} className="flex gap-4 items-center">
                  <img src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`} alt={item.product?.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{item.product?.name}</p>
                    <p className="text-gray-600 text-xs">Qty: {item.quantity} | {item.size} | {item.color}</p>
                  </div>
                  <p className="font-semibold text-indigo-600">${(item.product?.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xl font-bold text-gray-800 pt-6 border-t-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

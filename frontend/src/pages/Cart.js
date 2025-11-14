import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/api';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart?.items?.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  ) || 0;

  const handleCheckout = () => {
    if (cart?.items?.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        {!cart?.items || cart.items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-gray-600 mb-8">Your cart is empty</p>
            <Link to="/products" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map(item => (
                <div key={item._id} className="bg-white p-6 rounded-xl shadow-lg flex gap-6 items-center">
                  <img src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`} alt={item.product?.name} className="w-24 h-24 object-cover rounded-lg" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.product?.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">Size: {item.size} | Color: {item.color}</p>
                    <p className="text-indigo-600 font-semibold">${item.product?.price}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">Qty: {item.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800 mb-4">${(item.product?.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item._id)} className="bg-red-100 text-red-600 p-3 rounded-lg hover:bg-red-200 transition">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-6 border-t-2 mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition mb-4">
                Proceed to Checkout
              </button>
              <Link to="/products" className="block text-center text-indigo-600 font-semibold hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

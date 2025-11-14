import React, { useState, useEffect } from 'react';
import API, { API_BASE_URL } from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/my-orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-orange-500',
      processing: 'bg-blue-500',
      shipped: 'bg-purple-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) return <div className="text-center py-12 text-xl">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-xl text-gray-600">You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
                  <div>
                    <p className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</p>
                    <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`${getStatusColor(order.status)} text-white px-4 py-2 rounded-full font-semibold text-sm capitalize`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="p-6 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <img src={item.product?.image?.startsWith('http') ? item.product.image : `${API_BASE_URL}${item.product?.image}`} alt={item.product?.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">{item.product?.name}</h4>
                        <p className="text-gray-600 text-sm">Size: {item.size} | Color: {item.color}</p>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-indigo-600 text-lg">${item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between p-6 bg-gray-50 border-t">
                  <div className="text-gray-600 text-sm">
                    <strong className="block text-gray-800 mb-2">Shipping Address:</strong>
                    <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
                  </div>
                  <div className="text-right">
                    <strong className="block text-gray-800 mb-1">Total:</strong>
                    <p className="text-2xl font-bold text-gray-800">${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../utils/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    if (!user) return;
    try {
      const { data } = await API.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity, size, color) => {
    try {
      const { data } = await API.post('/cart/add', { productId, quantity, size, color });
      setCart(data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await API.delete(`/cart/remove/${itemId}`);
      setCart(data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await API.delete('/cart/clear');
      setCart({ items: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">Fashion Store</Link>
          
          <div className="flex gap-8">
            <Link to="/products" className="hover:opacity-80 transition font-medium">Shop</Link>
            {user?.role === 'seller' && <Link to="/seller/dashboard" className="hover:opacity-80 transition font-medium">Dashboard</Link>}
            {user?.role === 'buyer' && <Link to="/orders" className="hover:opacity-80 transition font-medium">Orders</Link>}
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                {user.role === 'buyer' && (
                  <Link to="/cart" className="relative">
                    <FiShoppingCart size={22} />
                    {cart?.items?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {cart.items.length}
                      </span>
                    )}
                  </Link>
                )}
                <span className="flex items-center gap-2 font-medium"><FiUser /> {user.name}</span>
                <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium hover:opacity-80 transition">Login</Link>
                <Link to="/register" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:-translate-y-0.5 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

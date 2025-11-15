import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl md:text-2xl font-bold">Fashion Store</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link to="/products" className="hover:opacity-80 transition font-medium">Shop</Link>
            {user?.role === 'seller' && <Link to="/seller/dashboard" className="hover:opacity-80 transition font-medium">Dashboard</Link>}
            {user?.role === 'buyer' && <Link to="/orders" className="hover:opacity-80 transition font-medium">Orders</Link>}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
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
                <span className="flex items-center gap-2 font-medium"><FiUser size={20} /> {user.name}</span>
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-white/20 pt-4">
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Shop</Link>
            {user?.role === 'seller' && <Link to="/seller/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Dashboard</Link>}
            {user?.role === 'buyer' && <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Orders</Link>}
            
            <div className="border-t border-white/20 pt-3 mt-3">
              {user ? (
                <>
                  {user.role === 'buyer' && (
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded transition font-medium">
                      <FiShoppingCart size={18} /> Cart
                      {cart?.items?.length > 0 && (
                        <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {cart.items.length}
                        </span>
                      )}
                    </Link>
                  )}
                  <div className="px-4 py-2 flex items-center gap-2 font-medium"><FiUser size={18} /> {user.name}</div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-white/10 rounded transition flex items-center gap-2 font-medium">
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-white/10 rounded transition font-medium">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 bg-white text-indigo-600 rounded font-semibold hover:opacity-90 transition">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

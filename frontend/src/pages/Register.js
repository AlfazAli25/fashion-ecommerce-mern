import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, role);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Account</h2>
        <p className="text-gray-600 text-center mb-8">Join our fashion community</p>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
            />
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
            />
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
            />
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-2">I want to</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition">
              <option value="buyer">Buy Clothes</option>
              <option value="seller">Sell Clothes</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition">
            Sign Up
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

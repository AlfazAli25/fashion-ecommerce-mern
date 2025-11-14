import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">Discover Your Style</h1>
          <p className="text-xl mb-8 opacity-90">Shop the latest fashion trends or start selling your own designs</p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg hover:-translate-y-1 hover:shadow-2xl transition">
              Shop Now
            </Link>
            <Link to="/register" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 hover:-translate-y-1 transition">
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-xl hover:-translate-y-2 hover:shadow-xl transition">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Wide Selection</h3>
              <p className="text-gray-600">Thousands of unique clothing items from talented sellers</p>
            </div>
            <div className="text-center p-8 rounded-xl hover:-translate-y-2 hover:shadow-xl transition">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="text-center p-8 rounded-xl hover:-translate-y-2 hover:shadow-xl transition">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing and great deals every day</p>
            </div>
            <div className="text-center p-8 rounded-xl hover:-translate-y-2 hover:shadow-xl transition">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure transactions guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of buyers and sellers today</p>
          <Link to="/register" className="bg-white text-red-500 px-10 py-4 rounded-lg font-semibold text-lg inline-block hover:-translate-y-1 hover:shadow-2xl transition">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

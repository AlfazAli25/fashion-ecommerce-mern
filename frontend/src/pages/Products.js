import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API, { API_BASE_URL } from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products', { params: { category, search } });
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Shop All Products</h1>
          
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[250px] px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition"
            />
            
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="min-w-[200px] px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition">
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-xl text-gray-600">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-xl text-gray-600">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <Link to={`/products/${product._id}`} key={product._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition group">
                <div className="h-80 overflow-hidden bg-gray-100">
                  <img src={product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-indigo-600 font-semibold text-sm mb-2">{product.category}</p>
                  <p className="text-2xl font-bold text-gray-800">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

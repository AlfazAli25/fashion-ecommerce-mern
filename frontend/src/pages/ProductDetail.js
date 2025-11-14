import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API, { API_BASE_URL } from '../utils/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      if (data.size?.length > 0) setSelectedSize(data.size[0]);
      if (data.color?.length > 0) setSelectedColor(data.color[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getImageForColor = () => {
    if (!product) return '';
    
    if (product.images && product.images.length > 0) {
      const colorImage = product.images.find(img => img.color === selectedColor);
      if (colorImage) return colorImage.url;
    }
    
    return product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`;
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'buyer') {
      alert('Only buyers can add items to cart');
      return;
    }
    await addToCart(product._id, quantity, selectedSize, selectedColor);
    alert('Added to cart!');
  };

  if (!product) return <div className="text-center py-12 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-xl">
          <div className="h-[500px] rounded-xl overflow-hidden bg-gray-100">
            <img src={getImageForColor()} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-indigo-600 font-semibold mb-4">{product.category}</p>
            <p className="text-4xl font-bold text-gray-800 mb-8">${product.price}</p>
            
            <div className="mb-8 pb-8 border-b">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.size?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Size</h4>
                <div className="flex gap-3 flex-wrap">
                  {product.size.map(size => (
                    <button
                      key={size}
                      className={`px-6 py-2 border-2 rounded-lg font-semibold transition ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:border-indigo-600'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.color?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Color</h4>
                <div className="flex gap-3 flex-wrap">
                  {product.color.map(color => (
                    <button
                      key={color}
                      className={`px-6 py-2 border-2 rounded-lg font-semibold transition ${selectedColor === color ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:border-indigo-600'}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Quantity</h4>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition mb-8">
              Add to Cart
            </button>

            <div className="pt-8 border-t">
              <h4 className="font-semibold text-gray-600 mb-2">Seller</h4>
              <p className="font-semibold text-gray-800">{product.seller?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const seller = await User.create({
      name: 'Fashion Seller',
      email: 'seller@example.com',
      password: hashedPassword,
      role: 'seller'
    });

    await User.create({
      name: 'John Buyer',
      email: 'buyer@example.com',
      password: hashedPassword,
      role: 'buyer'
    });

    const products = [
      { name: 'Classic White T-Shirt', description: 'Premium cotton t-shirt with a comfortable fit', price: 29.99, category: 'Men', size: ['S', 'M', 'L', 'XL'], color: ['White', 'Black', 'Gray'], stock: 50, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', images: [{color: 'White', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'}, {color: 'Black', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400'}, {color: 'Gray', url: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400'}] },
      { name: 'Denim Jeans', description: 'Stylish blue denim jeans with modern cut', price: 79.99, category: 'Men', size: ['30', '32', '34', '36'], color: ['Blue', 'Black'], stock: 30, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', images: [{color: 'Blue', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'}, {color: 'Black', url: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400'}] },
      { name: 'Summer Dress', description: 'Elegant floral summer dress', price: 59.99, category: 'Women', size: ['S', 'M', 'L'], color: ['Red', 'Blue', 'Yellow'], stock: 25, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', images: [{color: 'Red', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'}, {color: 'Blue', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'}, {color: 'Yellow', url: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=400'}] },
      { name: 'Leather Jacket', description: 'Premium leather jacket for all seasons', price: 199.99, category: 'Men', size: ['M', 'L', 'XL'], color: ['Black', 'Brown'], stock: 15, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', images: [{color: 'Black', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'}, {color: 'Brown', url: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400'}] },
      { name: 'Casual Sneakers', description: 'Comfortable sneakers for everyday wear', price: 89.99, category: 'Accessories', size: ['8', '9', '10', '11'], color: ['White', 'Black', 'Red'], stock: 40, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', images: [{color: 'White', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'}, {color: 'Black', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'}, {color: 'Red', url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400'}] },
      { name: 'Hoodie', description: 'Cozy hoodie with front pocket', price: 49.99, category: 'Men', size: ['S', 'M', 'L', 'XL'], color: ['Gray', 'Black', 'Navy'], stock: 35, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', images: [{color: 'Gray', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'}, {color: 'Black', url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400'}, {color: 'Navy', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'}] },
      { name: 'Yoga Pants', description: 'Stretchy and comfortable yoga pants', price: 39.99, category: 'Women', size: ['S', 'M', 'L'], color: ['Black', 'Gray', 'Purple'], stock: 45, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400', images: [{color: 'Black', url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400'}, {color: 'Gray', url: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400'}, {color: 'Purple', url: 'https://images.unsplash.com/photo-1587904947879-c7d5e38a5cb6?w=400'}] },
      { name: 'Kids T-Shirt', description: 'Colorful t-shirt for kids', price: 19.99, category: 'Kids', size: ['XS', 'S', 'M'], color: ['Red', 'Blue', 'Green'], stock: 60, image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400', images: [{color: 'Red', url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400'}, {color: 'Blue', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400'}, {color: 'Green', url: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400'}] },
      { name: 'Baseball Cap', description: 'Adjustable baseball cap', price: 24.99, category: 'Accessories', size: ['One Size'], color: ['Black', 'White', 'Red'], stock: 50, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400', images: [{color: 'Black', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400'}, {color: 'White', url: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400'}, {color: 'Red', url: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=400'}] },
      { name: 'Formal Shirt', description: 'Professional formal shirt', price: 54.99, category: 'Men', size: ['S', 'M', 'L', 'XL'], color: ['White', 'Blue', 'Black'], stock: 28, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', images: [{color: 'White', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400'}, {color: 'Blue', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'}, {color: 'Black', url: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400'}] },
      { name: 'Skirt', description: 'Trendy mini skirt', price: 44.99, category: 'Women', size: ['S', 'M', 'L'], color: ['Black', 'Red', 'Denim'], stock: 22, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', images: [{color: 'Black', url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400'}, {color: 'Red', url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'}, {color: 'Denim', url: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=400'}] },
      { name: 'Winter Coat', description: 'Warm winter coat with hood', price: 149.99, category: 'Women', size: ['S', 'M', 'L', 'XL'], color: ['Black', 'Navy', 'Beige'], stock: 18, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', images: [{color: 'Black', url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400'}, {color: 'Navy', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400'}, {color: 'Beige', url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400'}] }
    ];

    for (const product of products) {
      await Product.create({ ...product, seller: seller._id });
    }

    console.log('✅ Database seeded successfully!');
    console.log('Seller: seller@example.com / password123');
    console.log('Buyer: buyer@example.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

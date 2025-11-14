# Fashion E-Commerce Platform - MERN Stack

A full-stack e-commerce website for buying and selling clothes built with MongoDB, Express, React, and Node.js.

## Features

### For Buyers
- Browse and search products by category
- View detailed product information
- Add items to cart with size and color selection
- Secure checkout process
- Track order history and status

### For Sellers
- Create and manage product listings
- Upload product images
- Track inventory and stock
- View and manage orders
- Dashboard for business overview

### General Features
- User authentication (JWT)
- Beautiful, responsive UI with smooth animations
- Role-based access (Buyer/Seller)
- Real-time cart management
- Image upload functionality

## Tech Stack

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- React Icons
- CSS3 with animations

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Multer for file uploads

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

Frontend will run on http://localhost:3000

## Usage

1. **Register an Account:**
   - Choose between Buyer or Seller role
   - Fill in your details

2. **As a Buyer:**
   - Browse products on the Shop page
   - Click on products to view details
   - Add items to cart with preferred size and color
   - Proceed to checkout and place orders
   - View order history in Orders page

3. **As a Seller:**
   - Access Seller Dashboard
   - Add new products with images
   - Manage existing products (edit/delete)
   - View incoming orders

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (Seller only)
- PUT `/api/products/:id` - Update product (Seller only)
- DELETE `/api/products/:id` - Delete product (Seller only)
- GET `/api/products/seller/my-products` - Get seller's products

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart/add` - Add item to cart
- DELETE `/api/cart/remove/:itemId` - Remove item from cart
- DELETE `/api/cart/clear` - Clear cart

### Orders
- POST `/api/orders` - Create new order
- GET `/api/orders/my-orders` - Get buyer's orders
- GET `/api/orders/seller-orders` - Get seller's orders
- PUT `/api/orders/:id/status` - Update order status

## Project Structure

```
Kryptonix_Project/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & upload middleware
│   ├── uploads/         # Product images
│   ├── server.js        # Express server
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── context/     # React context (Auth, Cart)
    │   ├── utils/       # API utilities
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Screenshots & Features

- **Gradient UI:** Beautiful gradient backgrounds and smooth transitions
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Smooth Animations:** Fade-in effects and hover animations
- **User-Friendly:** Intuitive navigation and clear CTAs
- **Secure:** JWT authentication and password hashing

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Product reviews and ratings
- Wishlist functionality
- Advanced search and filters
- Email notifications
- Admin panel for platform management
- Social media integration

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

# Deployment Guide

## Prerequisites
- Node.js installed
- MongoDB Atlas account (or MongoDB server)
- Hosting platform account (Render, Railway, Heroku, etc.)

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_jwt_secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Deployment Steps

### Option 1: Deploy to Render (Recommended)

#### Backend Deployment
1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: fashion-store-api
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables (from Backend .env above)
7. Click "Create Web Service"

#### Frontend Deployment
1. In Render Dashboard, click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: fashion-store-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: build
4. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL + /api
5. Click "Create Static Site"

### Option 2: Deploy to Railway

#### Backend
1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Set root directory to `backend`
6. Deploy

#### Frontend
1. Build frontend locally: `cd frontend && npm run build`
2. Deploy the build folder to Netlify/Vercel
3. Set environment variable `REACT_APP_API_URL`

### Option 3: Single Server Deployment (VPS)

1. **Setup Server** (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb

# Install PM2
sudo npm install -g pm2
```

2. **Clone and Setup**
```bash
git clone your-repo-url
cd Kryptonix_Project

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with production values

# Frontend setup
cd ../frontend
npm install
cp .env.example .env
# Edit .env with production API URL
npm run build

# Start backend with PM2
cd ../backend
pm2 start server.js --name fashion-store-api
pm2 save
pm2 startup
```

3. **Setup Nginx**
```bash
sudo apt-get install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/fashion-store
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/Kryptonix_Project/frontend/build;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        proxy_pass http://localhost:5000;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/fashion-store /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **Setup SSL with Let's Encrypt**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string
6. Replace in MONGODB_URI

## Post-Deployment

1. **Seed Database**
```bash
npm run seed
```

2. **Test the Application**
- Visit your frontend URL
- Register a new account
- Test all features

3. **Monitor Logs**
```bash
# If using PM2
pm2 logs fashion-store-api

# If using Render/Railway
Check dashboard logs
```

## Security Checklist

- ✅ Change JWT_SECRET to a strong random string
- ✅ Use HTTPS (SSL certificate)
- ✅ Set NODE_ENV=production
- ✅ Whitelist specific IPs in MongoDB if possible
- ✅ Enable CORS only for your frontend domain
- ✅ Keep dependencies updated
- ✅ Use environment variables for all secrets

## Troubleshooting

**Images not loading?**
- Check REACT_APP_API_URL is correct
- Verify uploads folder exists and has permissions

**CORS errors?**
- Verify FRONTEND_URL in backend .env
- Check CORS configuration in server.js

**Database connection failed?**
- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

## Maintenance

```bash
# Update dependencies
npm update

# Restart services
pm2 restart fashion-store-api

# Backup database
mongodump --uri="your_mongodb_uri"
```

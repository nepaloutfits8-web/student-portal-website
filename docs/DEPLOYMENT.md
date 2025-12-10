# 🚀 Deployment Guide - Student Portal

Complete guide to deploy your Student Portal to production.

## 📋 Deployment Options

### Option 1: Free Hosting (Recommended for Testing)
- **Frontend:** Vercel or Netlify
- **Backend:** Railway or Render
- **Database:** MongoDB Atlas

### Option 2: VPS Hosting (Recommended for Production)
- **Server:** DigitalOcean, AWS EC2, or Linode
- **Database:** Self-hosted MongoDB or MongoDB Atlas

### Option 3: All-in-One Platform
- **Heroku** (Easy but paid)

---

## 🌐 Option 1: Free Hosting

### Step 1: Deploy Database (MongoDB Atlas)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select region closest to your users
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set privileges to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific IPs for better security

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/student-portal?retryWrites=true&w=majority
```

### Step 2: Deploy Backend (Railway)

1. **Create Account**
   - Go to [Railway.app](https://railway.app/)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Choose `backend` folder

3. **Add Environment Variables**
   - Go to project settings
   - Add variables:
   ```env
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_production_key_min_32_chars
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**
   - Railway will auto-deploy
   - Get your backend URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Frontend (Vercel)

1. **Create Account**
   - Go to [Vercel.com](https://vercel.com/)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select `frontend` folder as root directory

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Add Environment Variables**
   ```env
   REACT_APP_API_URL=https://your-backend.railway.app/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your frontend URL (e.g., `https://your-app.vercel.app`)

6. **Update Backend CORS**
   - Go back to Railway
   - Update `CORS_ORIGIN` with your Vercel URL

---

## 🖥️ Option 2: VPS Deployment (DigitalOcean)

### Prerequisites
- Domain name (optional but recommended)
- SSH access to server

### Step 1: Setup Server

1. **Create Droplet**
   - Choose Ubuntu 22.04 LTS
   - Select plan (minimum $6/month)
   - Add SSH key
   - Create droplet

2. **Connect to Server**
   ```bash
   ssh root@your_server_ip
   ```

3. **Update System**
   ```bash
   apt update && apt upgrade -y
   ```

4. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt install -y nodejs
   node --version
   npm --version
   ```

5. **Install MongoDB**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   apt update
   apt install -y mongodb-org
   systemctl start mongod
   systemctl enable mongod
   ```

6. **Install Nginx**
   ```bash
   apt install -y nginx
   systemctl start nginx
   systemctl enable nginx
   ```

7. **Install PM2**
   ```bash
   npm install -g pm2
   ```

### Step 2: Deploy Application

1. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/nepaloutfits8-web/student-portal-website.git
   cd student-portal-website
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   nano .env
   ```
   
   Add production environment variables:
   ```env
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb://localhost:27017/student-portal
   JWT_SECRET=your_super_secret_production_key
   JWT_EXPIRE=7d
   ```

3. **Start Backend with PM2**
   ```bash
   pm2 start server.js --name student-portal-api
   pm2 save
   pm2 startup
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env
   nano .env
   ```
   
   Add:
   ```env
   REACT_APP_API_URL=http://your_server_ip:5000/api
   ```

5. **Build Frontend**
   ```bash
   npm run build
   ```

### Step 3: Configure Nginx

1. **Create Nginx Config**
   ```bash
   nano /etc/nginx/sites-available/student-portal
   ```

2. **Add Configuration**
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;  # or your_server_ip

       # Frontend
       location / {
           root /var/www/student-portal-website/frontend/build;
           try_files $uri /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable Site**
   ```bash
   ln -s /etc/nginx/sites-available/student-portal /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

### Step 4: Setup SSL (Optional but Recommended)

1. **Install Certbot**
   ```bash
   apt install -y certbot python3-certbot-nginx
   ```

2. **Get SSL Certificate**
   ```bash
   certbot --nginx -d your_domain.com
   ```

3. **Auto-renewal**
   ```bash
   certbot renew --dry-run
   ```

---

## 🔒 Security Checklist

### Before Going Live:

- [ ] Change all default passwords
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable MongoDB authentication
- [ ] Setup firewall (UFW)
- [ ] Enable HTTPS/SSL
- [ ] Restrict CORS to your domain
- [ ] Add rate limiting
- [ ] Setup backup system
- [ ] Enable logging
- [ ] Add monitoring (PM2, New Relic)

### Firewall Setup (UFW)
```bash
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

---

## 📊 Monitoring

### PM2 Monitoring
```bash
# View logs
pm2 logs student-portal-api

# Monitor resources
pm2 monit

# Restart app
pm2 restart student-portal-api
```

### Setup Automated Backups
```bash
# Create backup script
nano /root/backup-mongodb.sh
```

Add:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --out /backups/mongodb_$DATE
find /backups -type d -mtime +7 -exec rm -rf {} +
```

Make executable and schedule:
```bash
chmod +x /root/backup-mongodb.sh
crontab -e
# Add: 0 2 * * * /root/backup-mongodb.sh
```

---

## 🔄 Updates & Maintenance

### Update Application
```bash
cd /var/www/student-portal-website
git pull origin main

# Update backend
cd backend
npm install
pm2 restart student-portal-api

# Update frontend
cd ../frontend
npm install
npm run build
```

---

## 🆘 Troubleshooting

### Backend Not Starting
```bash
pm2 logs student-portal-api
# Check for errors
```

### Database Connection Issues
```bash
systemctl status mongod
mongo  # Test connection
```

### Nginx Errors
```bash
nginx -t  # Test configuration
tail -f /var/log/nginx/error.log
```

---

## 📈 Performance Optimization

1. **Enable Gzip in Nginx**
2. **Setup CDN for static assets**
3. **Enable caching**
4. **Optimize images**
5. **Use PM2 cluster mode**

---

## 💰 Cost Estimate

### Free Tier (Testing)
- MongoDB Atlas: Free (512MB)
- Railway: Free (500 hours/month)
- Vercel: Free (unlimited)
- **Total: $0/month**

### VPS (Production)
- DigitalOcean Droplet: $6-12/month
- Domain: $10-15/year
- **Total: ~$8/month**

---

## ✅ Post-Deployment Checklist

- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify email notifications
- [ ] Test payment gateway
- [ ] Setup analytics (Google Analytics)
- [ ] Add error tracking (Sentry)
- [ ] Create admin documentation
- [ ] Train users

---

**Your Student Portal is now live! 🎉**

For support: nepaloutfits8@gmail.com

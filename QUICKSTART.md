# ⚡ Quick Start Guide

Get your Student Portal running in 5 minutes!

## 🚀 Super Fast Setup

### 1. Prerequisites Check
```bash
node --version  # Should be v14+
npm --version
mongod --version  # Should be v4.4+
```

### 2. Clone & Install
```bash
# Clone repository
git clone https://github.com/nepaloutfits8-web/student-portal-website.git
cd student-portal-website

# Install backend
cd backend
npm install
cp .env.example .env

# Install frontend (in new terminal)
cd frontend
npm install
```

### 3. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Run Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### 5. Access Application
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Login:** STU001 / password123

## 🎯 What's Next?

1. **Add Sample Data:** See [SETUP.md](docs/SETUP.md#database-setup)
2. **Customize:** Edit colors, logos, features
3. **Deploy:** Follow [DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 📚 Full Documentation

- [Complete Setup Guide](docs/SETUP.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/API.md)

## 🆘 Common Issues

**Port already in use?**
```bash
# Kill process on port 5000
lsof -i :5000  # Find PID
kill -9 <PID>  # Kill it
```

**MongoDB not starting?**
```bash
# Check status
sudo systemctl status mongod

# Restart
sudo systemctl restart mongod
```

**Module not found?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## ✨ Features Included

✅ Student Login & Authentication  
✅ Dashboard with Quick Stats  
✅ Attendance Tracking  
✅ Assignment Management  
✅ Exam Results & Grades  
✅ Fee Payment System  
✅ Library Management  
✅ Notices & Announcements  
✅ Timetable Viewer  
✅ Profile Management  
✅ Responsive Design  
✅ Secure JWT Authentication  

## 🎨 Customization Tips

**Change Colors:**
- Edit `frontend/src/index.css`
- Modify Tailwind classes in components

**Add Logo:**
- Replace logo in `frontend/public/logo.png`
- Update in `Layout.js` component

**Modify Features:**
- Backend routes in `backend/routes/`
- Frontend pages in `frontend/src/pages/`

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/nepaloutfits8-web/student-portal-website/issues)
- **Email:** nepaloutfits8@gmail.com
- **Docs:** [Full Documentation](docs/)

---

**Happy Building! 🎉**

Made with ❤️ by Nepal Outfits Team

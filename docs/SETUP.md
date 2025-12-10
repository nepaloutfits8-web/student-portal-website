# 🚀 Setup Guide - Student Portal

Complete step-by-step guide to set up the Student Portal on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🔧 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/nepaloutfits8-web/student-portal-website.git
cd student-portal-website
```

### 2. Setup Backend

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env file with your configuration
nano .env  # or use any text editor
```

**Required Environment Variables:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
```

#### Start MongoDB
```bash
# On Windows
net start MongoDB

# On macOS (with Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

#### Run Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend should now be running on `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal window:

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Configure Environment Variables
```bash
# Create .env file
touch .env

# Add the following
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

#### Install Tailwind CSS
```bash
npx tailwindcss init -p
```

Create `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Run Frontend
```bash
npm start
```

Frontend should now be running on `http://localhost:3000`

## 🗄️ Database Setup

### Create Sample Data

You can use MongoDB Compass or the mongo shell to add sample data:

#### Sample Student
```javascript
db.students.insertOne({
  studentId: "STU001",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash "password123"
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@college.edu",
    phone: "+977-9800000000",
    dateOfBirth: new Date("2000-01-01"),
    gender: "Male",
    address: {
      city: "Kathmandu",
      state: "Bagmati",
      country: "Nepal"
    }
  },
  academicInfo: {
    department: "Computer Science",
    course: "B.Tech",
    semester: 3,
    batch: "2022-2026",
    rollNumber: "CS22001"
  },
  isActive: true
})
```

### Or Use the Seed Script

Create `backend/seed.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Create sample student
    await Student.create({
      studentId: 'STU001',
      password: hashedPassword,
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@college.edu',
        phone: '+977-9800000000',
        dateOfBirth: new Date('2000-01-01'),
        gender: 'Male'
      },
      academicInfo: {
        department: 'Computer Science',
        course: 'B.Tech',
        semester: 3,
        batch: '2022-2026',
        rollNumber: 'CS22001'
      }
    });
    
    console.log('Sample data created!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
```

Run the seed script:
```bash
node seed.js
```

## ✅ Verify Installation

### Test Backend
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Student Portal API is running",
  "timestamp": "2025-12-10T18:00:00.000Z"
}
```

### Test Frontend
Open browser and navigate to `http://localhost:3000`

You should see the login page.

### Test Login
Use the demo credentials:
- **Student ID:** STU001
- **Password:** password123

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
# Check MongoDB status
sudo systemctl status mongod  # Linux
brew services list  # macOS
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using the port
```bash
# Find process
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Check backend CORS configuration in `server.js`
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

## 📱 Mobile Testing

To test on mobile devices on the same network:

1. Find your local IP address:
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

2. Update frontend `.env`:
```env
REACT_APP_API_URL=http://YOUR_IP:5000/api
```

3. Access from mobile:
```
http://YOUR_IP:3000
```

## 🔐 Security Notes

### For Development:
- Use simple JWT secrets
- MongoDB without authentication is OK
- CORS can be open

### For Production:
- Use strong JWT secrets (32+ characters)
- Enable MongoDB authentication
- Restrict CORS to your domain
- Use HTTPS
- Enable rate limiting
- Add input validation

## 📚 Next Steps

1. ✅ Complete the setup
2. 📖 Read the [API Documentation](API.md)
3. 🚀 Check [Deployment Guide](DEPLOYMENT.md)
4. 🎨 Customize the UI
5. 📊 Add more features

## 💡 Tips

- Use **nodemon** for backend auto-reload
- Use **React DevTools** for debugging
- Use **MongoDB Compass** for database management
- Use **Postman** for API testing
- Keep `.env` files in `.gitignore`

## 🆘 Need Help?

- Check [GitHub Issues](https://github.com/nepaloutfits8-web/student-portal-website/issues)
- Read the documentation
- Contact: nepaloutfits8@gmail.com

---

**Happy Coding! 🎉**

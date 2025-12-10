# 🎓 Student Portal Website

A comprehensive web-based Student Portal for colleges and universities with complete student management features.

## ✨ Features

### 🔐 Authentication
- Secure student login with JWT tokens
- Password encryption
- Session management
- Role-based access control

### 📊 Dashboard
- Personalized student dashboard
- Quick stats overview (attendance, assignments, fees)
- Recent notifications
- Upcoming events and deadlines

### 📈 Attendance Management
- Real-time attendance tracking
- Subject-wise attendance percentage
- Attendance history with dates
- Low attendance alerts
- Downloadable attendance reports

### 📝 Assignment Management
- View all assignments (pending, submitted, graded)
- Upload assignments (PDF, Word, code files)
- Deadline tracking with color-coded alerts
- Grade viewing with teacher feedback
- Assignment history

### 🎓 Exam Results & Grades
- Semester-wise results
- Subject-wise marks and grades
- GPA/CGPA calculation
- Downloadable mark sheets
- Performance analytics
- Class rank and comparison

### 📅 Timetable
- Weekly class schedule
- Daily view with room numbers
- Teacher information
- Exam timetable
- Class reminders

### 💰 Fee Management
- Fee status (paid/pending)
- Detailed fee breakdown
- Online payment integration
- Payment history
- Downloadable receipts
- Installment tracking

### 📚 Library System
- Book search and availability
- Issue/return books online
- Borrowed books tracking
- Due date reminders
- Fine calculation and payment
- Book reservation

### 📢 Notices & Announcements
- College-wide notices
- Department-specific announcements
- Personalized notifications
- Event registrations
- Emergency alerts

### 👤 Profile Management
- Personal information
- Edit contact details
- Upload profile photo
- Download documents (ID card, certificates)
- Document management

### 💬 Communication
- Message teachers
- Class group discussions
- Complaint/feedback system
- Parent access portal

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API calls
- **Chart.js** - Data visualization
- **React Icons** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File uploads

### Deployment
- **Frontend:** Vercel/Netlify
- **Backend:** Railway/Render
- **Database:** MongoDB Atlas

## 📁 Project Structure

```
student-portal-website/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # Context API
│   │   ├── utils/           # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/                  # Node.js backend
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration
│   ├── utils/               # Utility functions
│   ├── server.js
│   └── package.json
│
├── docs/                     # Documentation
│   ├── API.md               # API documentation
│   ├── SETUP.md             # Setup guide
│   └── DEPLOYMENT.md        # Deployment guide
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nepaloutfits8-web/student-portal-website.git
cd student-portal-website
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend Environment Variables (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

See [API.md](docs/API.md) for complete API documentation.

### Key Endpoints

**Authentication**
- POST `/api/auth/login` - Student login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user

**Attendance**
- GET `/api/attendance` - Get student attendance
- GET `/api/attendance/:subject` - Subject-wise attendance

**Assignments**
- GET `/api/assignments` - Get all assignments
- POST `/api/assignments/:id/submit` - Submit assignment
- GET `/api/assignments/:id/grade` - Get grade

**Results**
- GET `/api/results` - Get all results
- GET `/api/results/:semester` - Semester results

**Fees**
- GET `/api/fees` - Get fee status
- POST `/api/fees/pay` - Make payment

## 🎨 Screenshots

(Screenshots will be added after deployment)

## 👥 User Roles

### Student
- View personal data
- Submit assignments
- Check attendance
- View results
- Pay fees
- Access library

### Admin (Future)
- Manage students
- Upload results
- Post notices
- Manage fees
- Generate reports

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- SQL injection prevention
- XSS protection

## 📱 Responsive Design

- Mobile-first approach
- Works on all devices (phone, tablet, desktop)
- Touch-friendly interface
- Optimized performance

## 🚀 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for deployment instructions.

### Quick Deploy

**Frontend (Vercel)**
```bash
cd frontend
vercel
```

**Backend (Railway)**
```bash
cd backend
railway up
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your college!

## 👨‍💻 Developer

Created by Nepal Outfits Team

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/nepaloutfits8-web/student-portal-website/issues)
- Email: nepaloutfits8@gmail.com

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Admin panel
- [ ] Teacher portal
- [ ] Parent portal
- [ ] AI chatbot for doubts
- [ ] Video lectures integration
- [ ] Discussion forums
- [ ] Placement portal
- [ ] Alumni network

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ for students**

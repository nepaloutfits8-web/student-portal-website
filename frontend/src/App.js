import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import Results from './pages/Results';
import Fees from './pages/Fees';
import Library from './pages/Library';
import Notices from './pages/Notices';
import Timetable from './pages/Timetable';
import Profile from './pages/Profile';

// Components
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/results" element={<Results />} />
                <Route path="/fees" element={<Fees />} />
                <Route path="/library" element={<Library />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

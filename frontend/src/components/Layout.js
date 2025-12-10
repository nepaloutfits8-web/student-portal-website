import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome, FiCalendar, FiFileText, FiAward, FiDollarSign,
  FiBook, FiBell, FiClock, FiUser, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/attendance', icon: FiCalendar, label: 'Attendance' },
    { path: '/assignments', icon: FiFileText, label: 'Assignments' },
    { path: '/results', icon: FiAward, label: 'Results' },
    { path: '/fees', icon: FiDollarSign, label: 'Fees' },
    { path: '/library', icon: FiBook, label: 'Library' },
    { path: '/notices', icon: FiBell, label: 'Notices' },
    { path: '/timetable', icon: FiClock, label: 'Timetable' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <h1 className="text-2xl font-bold text-blue-600">Student Portal</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={user?.profilePhoto || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.studentId}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FiMenu size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Semester {user?.semester}</p>
                <p className="font-medium text-gray-800">{user?.department}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;

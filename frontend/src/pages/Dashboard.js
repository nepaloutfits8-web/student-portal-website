import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FiCalendar, FiFileText, FiAward, FiDollarSign,
  FiBook, FiBell, FiTrendingUp, FiAlertCircle
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    attendance: { overall: 0, subjects: [] },
    assignments: { pending: 0, total: 0 },
    fees: { pending: 0, total: 0 },
    library: { issued: 0, overdue: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      // Fetch all data in parallel
      const [attendanceRes, assignmentsRes, feesRes, libraryRes, noticesRes] = await Promise.all([
        axios.get(`${API_URL}/attendance`).catch(() => ({ data: { data: { summary: [] } } })),
        axios.get(`${API_URL}/assignments`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/fees`).catch(() => ({ data: { summary: { totalPending: 0, totalAmount: 0 } } })),
        axios.get(`${API_URL}/library`).catch(() => ({ data: { summary: { activeBooks: 0, totalFine: 0 } } })),
        axios.get(`${API_URL}/notices`).catch(() => ({ data: { data: { all: [] } } }))
      ]);

      // Calculate overall attendance
      const subjects = attendanceRes.data.data?.summary || [];
      const overallAttendance = subjects.length > 0
        ? subjects.reduce((sum, s) => sum + s.percentage, 0) / subjects.length
        : 0;

      // Count pending assignments
      const assignments = assignmentsRes.data.data || [];
      const pendingAssignments = assignments.filter(a => a.status === 'Not Submitted').length;

      setStats({
        attendance: {
          overall: overallAttendance.toFixed(2),
          subjects: subjects.slice(0, 3)
        },
        assignments: {
          pending: pendingAssignments,
          total: assignments.length
        },
        fees: {
          pending: feesRes.data.summary?.totalPending || 0,
          total: feesRes.data.summary?.totalAmount || 0
        },
        library: {
          issued: libraryRes.data.summary?.activeBooks || 0,
          overdue: libraryRes.data.summary?.totalFine > 0 ? 1 : 0
        }
      });

      setNotices(noticesRes.data.data?.all?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    {
      title: 'Attendance',
      value: `${stats.attendance.overall}%`,
      icon: FiCalendar,
      color: 'blue',
      link: '/attendance',
      status: stats.attendance.overall >= 75 ? 'good' : 'warning'
    },
    {
      title: 'Pending Assignments',
      value: stats.assignments.pending,
      icon: FiFileText,
      color: 'purple',
      link: '/assignments',
      status: stats.assignments.pending > 0 ? 'warning' : 'good'
    },
    {
      title: 'Fee Pending',
      value: `₹${stats.fees.pending}`,
      icon: FiDollarSign,
      color: 'green',
      link: '/fees',
      status: stats.fees.pending > 0 ? 'warning' : 'good'
    },
    {
      title: 'Books Issued',
      value: stats.library.issued,
      icon: FiBook,
      color: 'orange',
      link: '/library',
      status: stats.library.overdue > 0 ? 'warning' : 'good'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your academics today
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="card hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
              {stat.status === 'warning' && (
                <div className="mt-3 flex items-center text-yellow-600 text-sm">
                  <FiAlertCircle size={16} className="mr-1" />
                  <span>Needs attention</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-header mb-0">Attendance Overview</h2>
            <Link to="/attendance" className="text-blue-600 hover:text-blue-700 text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {stats.attendance.subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{subject.subject}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        subject.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{subject.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-header mb-0">Recent Notices</h2>
            <Link to="/notices" className="text-blue-600 hover:text-blue-700 text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {notices.length > 0 ? (
              notices.map((notice, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiBell className="text-blue-600 mt-1" size={18} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{notice.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notice.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent notices</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

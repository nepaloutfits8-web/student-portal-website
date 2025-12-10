import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCalendar, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const Attendance = () => {
  const [attendance, setAttendance] = useState({ summary: [], records: [] });
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${API_URL}/attendance`);
      setAttendance(res.data.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner"></div>
      </div>
    );
  }

  const filteredRecords = selectedSubject === 'all'
    ? attendance.records
    : attendance.records.filter(r => r.subject === selectedSubject);

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance</h1>
        <p className="text-gray-600">Track your class attendance and maintain minimum requirements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attendance.summary.map((subject, index) => (
          <div key={index} className="card">
            <h3 className="font-semibold text-gray-800 mb-3">{subject.subject}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-gray-800">{subject.percentage}%</span>
              <div className={`p-2 rounded-full ${
                subject.percentage >= 75 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {subject.percentage >= 75 ? (
                  <FiCheckCircle className="text-green-600" size={24} />
                ) : (
                  <FiXCircle className="text-red-600" size={24} />
                )}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Present: {subject.present}</span>
              <span>Absent: {subject.absent}</span>
              <span>Total: {subject.total}</span>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  subject.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${subject.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Records */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="input w-48"
          >
            <option value="all">All Subjects</option>
            {attendance.summary.map((subject, index) => (
              <option key={index} value={subject.subject}>{subject.subject}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Period</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{record.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{record.period}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${
                      record.status === 'Present' ? 'badge-success' :
                      record.status === 'Late' ? 'badge-warning' :
                      'badge-danger'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

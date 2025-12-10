import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBook, FiCalendar } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Icon className="text-blue-600" size={20} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value || 'Not provided'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">View and manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="card text-center">
          <img
            src={user?.profilePhoto || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</h2>
          <p className="text-gray-600 mb-2">{user?.studentId}</p>
          <span className="badge badge-info">{user?.department}</span>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 card">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={FiUser} label="Full Name" value={user?.name} />
            <InfoItem icon={FiMail} label="Email" value={user?.email} />
            <InfoItem icon={FiPhone} label="Phone" value="+977-9800000000" />
            <InfoItem icon={FiMapPin} label="Address" value="Kathmandu, Nepal" />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoItem icon={FiBook} label="Department" value={user?.department} />
          <InfoItem icon={FiCalendar} label="Semester" value={`Semester ${user?.semester}`} />
          <InfoItem icon={FiUser} label="Roll Number" value="CS22001" />
        </div>
      </div>

      {/* Actions */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary">Edit Profile</button>
          <button className="btn btn-secondary">Change Password</button>
          <button className="btn btn-secondary">Download ID Card</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

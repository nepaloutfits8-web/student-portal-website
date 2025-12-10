import React from 'react';
import { FiBell } from 'react-icons/fi';

const Notices = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Notices & Announcements</h1>
        <p className="text-gray-600">Stay updated with college notices</p>
      </div>

      <div className="card text-center py-12">
        <FiBell className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Notices Feature</h3>
        <p className="text-gray-500 mb-4">This page will display all college notices and announcements</p>
        <p className="text-sm text-gray-400">Connect to backend API to see real data</p>
      </div>
    </div>
  );
};

export default Notices;

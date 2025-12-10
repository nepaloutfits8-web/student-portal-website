import React from 'react';
import { FiDollarSign } from 'react-icons/fi';

const Fees = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Fee Management</h1>
        <p className="text-gray-600">View and pay your college fees</p>
      </div>

      <div className="card text-center py-12">
        <FiDollarSign className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Fees Feature</h3>
        <p className="text-gray-500 mb-4">This page will display your fee status and payment history</p>
        <p className="text-sm text-gray-400">Connect to backend API to see real data</p>
      </div>
    </div>
  );
};

export default Fees;

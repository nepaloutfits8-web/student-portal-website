import React from 'react';
import { FiAward } from 'react-icons/fi';

const Results = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Exam Results</h1>
        <p className="text-gray-600">View your exam results and grades</p>
      </div>

      <div className="card text-center py-12">
        <FiAward className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Results Feature</h3>
        <p className="text-gray-500 mb-4">This page will display your exam results and CGPA</p>
        <p className="text-sm text-gray-400">Connect to backend API to see real data</p>
      </div>
    </div>
  );
};

export default Results;

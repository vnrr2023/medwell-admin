import React from 'react';
import Layout from '../components/Layout';

const Reports = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Reports</h2>
        <p className="text-gray-700 dark:text-gray-300">View and manage reports here.</p>
      </div>
    </Layout>
  );
};

export default Reports;
import React from 'react';
import Layout from '../components/Layout';

const Manage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Manage</h2>
          <p className="text-gray-700 dark:text-gray-300">Manage your users here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Manage;
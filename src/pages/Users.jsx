import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Eye, Hospital, User } from 'lucide-react';
import Layout from '../components/Layout';

const mockUsers = [
  { id: 1, name: 'Dr. John Doe', type: 'doctor', specialty: 'Cardiology', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'City Hospital', type: 'hospital', location: 'New York', email: 'info@cityhospital.com', phone: '987-654-3210' },
  { id: 3, name: 'Dr. Jane Smith', type: 'doctor', specialty: 'Pediatrics', email: 'jane.smith@example.com', phone: '456-789-0123' },
  { id: 4, name: 'County Medical Center', type: 'hospital', location: 'Los Angeles', email: 'info@countymedical.com', phone: '321-654-0987' },
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filter, setFilter] = useState('all');
  const [modalContent, setModalContent] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = filter === 'all' ? users : users.filter(user => user.type === filter);

  const handleApprove = (id) => {
    setModalContent({ text: 'User Approved!', icon: <Check className="text-green-500 w-12 h-12" /> });
    setTimeout(() => {
      setModalContent(null);
      setUsers(users.filter(user => user.id !== id));
    }, 2000);
  };

  const handleReject = (id) => {
    setModalContent({ text: 'User Rejected!', icon: <X className="text-red-500 w-12 h-12" /> });
    setTimeout(() => {
      setModalContent(null);
      setUsers(users.filter(user => user.id !== id));
    }, 2000);
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex justify-between items-center">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="all">All</option>
            <option value="doctor">Doctors</option>
            <option value="hospital">Hospitals</option>
          </select>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <motion.tr 
                  key={user.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 flex items-center">
                    {user.type === 'doctor' ? <User className="mr-2 text-blue-500" /> : <Hospital className="mr-2 text-green-500" />}
                    {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.type === 'doctor' ? user.specialty : user.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleApprove(user.id)} className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 mr-2">Approve</button>
                    <button onClick={() => handleReject(user.id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 mr-2">Reject</button>
                    <button onClick={() => handleView(user)} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200">View</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modalContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{modalContent.text}</h2>
              {modalContent.icon}
            </motion.div>
          </motion.div>
        )}

        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedUser.name}</h2>
              <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Type:</strong> {selectedUser.type}</p>
              <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>{selectedUser.type === 'doctor' ? 'Specialty' : 'Location'}:</strong> {selectedUser.type === 'doctor' ? selectedUser.specialty : selectedUser.location}</p>
              <p className="mb-2 text-gray-700 dark:text-gray-300"><strong>Email:</strong> {selectedUser.email}</p>
              <p className="mb-4 text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {selectedUser.phone}</p>
              <button 
                onClick={() => setSelectedUser(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Users;
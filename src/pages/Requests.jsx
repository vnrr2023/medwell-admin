import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Hospital, User } from 'lucide-react'
import Layout from '../components/Layout'

const mockUsers = [
  { 
    id: 1, 
    name: 'Dr. John Doe', 
    type: 'doctor', 
    specialty: 'Cardiology', 
    email: 'john.doe@example.com', 
    phone: '123-456-7890',
    age: 45,
    experience: '15 years',
    education: 'St. Xaviers',
    languages: 'English, Spanish',
    availability: 'Mon-Fri, 9AM-5PM',
    certifications: 'Board Certified in Cardiology',
    publications: '25+ peer-reviewed articles',
    researchInterests: 'Uska Heart',
    professionalMemberships: 'Anjuman Medical Engineers',
    awards: 'Oscar'
  },
  { 
    id: 2, 
    name: 'City Hospital', 
    type: 'hospital', 
    location: 'New York', 
    email: 'info@cityhospital.com', 
    phone: '987-654-3210',
    beds: 500,
    emergencyServices: 'Yes',
    specialties: 'All',
    parkingAvailable: 'Yes',
    insuranceAccepted: 'Yes',
    medicalSchool: 'Yes',
    wheelchairFacilities: 'Yes'
  },
  { 
    id: 3, 
    name: 'Dr. Jane Smith', 
    type: 'doctor', 
    specialty: 'Pediatrics', 
    email: 'jane.smith@example.com', 
    phone: '456-789-0123',
    age: 45,
    experience: '15 years',
    education: 'St. Xaviers',
    languages: 'English, Spanish',
    availability: 'Mon-Fri, 9AM-5PM',
    certifications: 'Board Certified in Cardiology',
    publications: '25+ peer-reviewed articles',
    researchInterests: 'Uska Heart',
    professionalMemberships: 'Anjuman Medical Engineers',
    awards: 'Oscar'
  },
  { 
    id: 4, 
    name: 'County Medical Center', 
    type: 'hospital', 
    location: 'Los Angeles', 
    email: 'info@countymedical.com', 
    phone: '321-654-0987',
    beds: 500,
    emergencyServices: 'Yes',
    specialties: 'All',
    parkingAvailable: 'Yes',
    insuranceAccepted: 'Yes',
    medicalSchool: 'Yes',
    wheelchairFacilities: 'Yes'
  },
]

const Requests = () => {
  const [users, setUsers] = useState(mockUsers)
  const [filter, setFilter] = useState('all')
  const [modalContent, setModalContent] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = filter === 'all' ? users : users.filter(user => user.type === filter)

  const handleApprove = (id, event) => {
    event.stopPropagation()
    setModalContent({ text: 'User Approved!', icon: <Check className="text-green-500 w-12 h-12" /> })
    setTimeout(() => {
      setModalContent(null)
      setUsers(users.filter(user => user.id !== id))
      setSelectedUser(null)
    }, 2000)
  }

  const handleReject = (id, event) => {
    event.stopPropagation()
    setModalContent({ text: 'User Rejected!', icon: <X className="text-red-500 w-12 h-12" /> })
    setTimeout(() => {
      setModalContent(null)
      setUsers(users.filter(user => user.id !== id))
      setSelectedUser(null)
    }, 2000)
  }

  const handleRowClick = (user) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user)
  }

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
                <React.Fragment key={user.id}>
                  <motion.tr 
                    onClick={() => handleRowClick(user)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out"
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
                      <button onClick={(e) => handleApprove(user.id, e)} className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 mr-2">Approve</button>
                      <button onClick={(e) => handleReject(user.id, e)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 mr-2">Reject</button>
                    </td>
                  </motion.tr>
                  <AnimatePresence>
                    {selectedUser?.id === user.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <td colSpan={4} className="px-6 py-4">
                          <motion.div 
                            className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{user.name} Details</h3>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <p className="text-base text-gray-600 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
                                <p className="text-base text-gray-600 dark:text-gray-300"><strong>Phone:</strong> {user.phone}</p>
                                {user.type === 'doctor' ? (
                                  <>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Age:</strong> {user.age}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Experience:</strong> {user.experience}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Education:</strong> {user.education}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Certifications:</strong> {user.certifications}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Languages:</strong> {user.languages}</p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Beds:</strong> {user.beds}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Emergency Services:</strong> {user.emergencyServices}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Specialties:</strong> {user.specialties}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Parking Available:</strong> {user.parkingAvailable}</p>
                                  </>
                                )}
                              </div>
                              <div>
                                {user.type === 'doctor' ? (
                                  <>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Availability:</strong> {user.availability}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Publications:</strong> {user.publications}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Research Interests:</strong> {user.researchInterests}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Professional Memberships:</strong> {user.professionalMemberships}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Awards:</strong> {user.awards}</p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Insurance Accepted:</strong> {user.insuranceAccepted}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Medical School:</strong> {user.medicalSchool}</p>
                                    <p className="text-base text-gray-600 dark:text-gray-300"><strong>Wheelchair Facilities:</strong> {user.wheelchairFacilities}</p>
                                  </>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
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
      </AnimatePresence>
    </Layout>
  )
}

export default Requests


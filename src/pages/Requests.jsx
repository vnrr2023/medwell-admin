import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Hospital, User, FileText } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import Layout from '../components/Layout'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

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
    languages: 'English',
    certifications: 'Board Certified in Cardiology',
    publications: 'DIS ki book',
    researchInterests: 'Uska Heart',
    professionalMemberships: 'Anjuman Medical Engineers',
    awards: 'Oscar',
    documents: [
      { 
        name: 'Medical License',
        url: 'No Pdf Available'
      },
      {
        name: 'Board Certification',
        url: 'No Pdf Available'
      },
      {
        name: 'Aadhar Card',
        url: 'No Pdf Available'
      },
      {
        name: 'Resume',
        url: 'No Pdf Available'
      }
    ]
  }
  // ,
  // { 
  //   id: 2, 
  //   name: 'City Hospital', 
  //   type: 'hospital', 
  //   location: 'New York', 
  //   email: 'info@cityhospital.com', 
  //   phone: '987-654-3210',
  //   beds: 500,
  //   emergencyServices: 'Yes',
  //   specialties: 'All',
  //   parkingAvailable: 'Yes',
  //   insuranceAccepted: 'Yes',
  //   medicalSchool: 'Yes',
  //   wheelchairFacilities: 'Yes',
  //   documents: [
  //     {
  //       name: 'Hospital License',
  //       url: 'No Pdf Available'
  //     },
  //     {
  //       name: 'Accreditation Certificate',
  //       url: 'No Pdf Available'
  //     }
  //   ]
  // },
  // { 
  //   id: 3, 
  //   name: 'Dr. Jane Smith', 
  //   type: 'doctor', 
  //   specialty: 'Pediatrics', 
  //   email: 'jane.smith@example.com', 
  //   phone: '456-789-0123',
  //   age: 38,
  //   experience: '10 years',
  //   education: 'University of Mumbai',
  //   languages: 'English, Hindi',
  //   certifications: 'Board Certified in Pediatrics',
  //   publications: 'Child Health in Urban India',
  //   researchInterests: 'Childhood Obesity Prevention',
  //   professionalMemberships: 'Indian Academy of Pediatrics',
  //   awards: 'Young Researcher Award 2022',
  //   documents: [
  //     { 
  //       name: 'Medical License',
  //       url: 'No Pdf Available'
  //     },
  //     {
  //       name: 'Board Certification',
  //       url: 'No Pdf Available'
  //     },
  //     {
  //       name: 'Aadhar Card',
  //       url: 'No Pdf Available'
  //     },
  //     {
  //       name: 'Resume',
  //       url: 'No Pdf Available'
  //     }
  //   ]
  // },
  // { 
  //   id: 4, 
  //   name: 'County Medical Center', 
  //   type: 'hospital', 
  //   location: 'Los Angeles', 
  //   email: 'info@countymedical.com', 
  //   phone: '321-654-0987',
  //   beds: 300,
  //   emergencyServices: 'Yes',
  //   specialties: 'All',
  //   parkingAvailable: 'Yes',
  //   insuranceAccepted: 'Yes',
  //   medicalSchool: 'Yes',
  //   wheelchairFacilities: 'Yes',
  //   documents: [
  //     {
  //       name: 'Hospital License',
  //       url: 'No Pdf Available'
  //     },
  //     {
  //       name: 'Accreditation Certificate',
  //       url: 'No Pdf Available'
  //     }
  //   ]
  // },
]

const Users = () => {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('all')
  const [modalContent, setModalContent] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [userToReject, setUserToReject] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://medwell-admin-backend.vercel.app/api/users/getUser')
      const result = await response.json()
      
      if (result.data && Array.isArray(result.data)) {
        const unverifiedUsers = result.data.filter(user => user.verified === false)
        
        const transformedUsers = unverifiedUsers.map(user => ({
          id: user.id,
          name: user.name || 'Unknown',
          type: 'doctor', 
          specialty: user.speciality || 'Not specified',
          email: user.user_id, 
          phone: user.phone_number || 'N/A',
          age: null,
          experience: null,
          education: user.education || 'Not specified',
          documents: [
            {
              name: 'Registration Card',
              url: user.registeration_card_image || 'No Pdf Available'
            },
            {
              name: 'Aadhar Card',
              url: user.adhaar_card || 'No Pdf Available'
            },
            {
              name: 'Profile Picture',
              url: user.profile_pic || 'No Pdf Available'
            }
          ],
          verified: user.verified,
          submitted_at: user.submitted_at
        }))
        setUsers(transformedUsers)
      } else {
        console.warn('format error')
        setUsers([])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    }
  }

  const handleApprove = async (id, event) => {
    event.stopPropagation()
    
    try {
      console.log('Put request:', id)
      
      const response = await fetch(`https://medwell-admin-backend.vercel.app/api/users/verify/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verified: true
        })
      })

      const responseData = await response.json()
      console.log('Full API Response:', {
        status: responseData.status,
        message: responseData.message,
        data: responseData.data
      })

    
      if (!response.ok) {
        throw new Error('Failed to approve user')
      }

      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user => {
          if (user.id === id) {
            const updatedUser = { ...user, verified: true }
            console.log('Local state update:', {
              id: updatedUser.id,
              name: updatedUser.name,
              verified: updatedUser.verified
            })
            return updatedUser
          }
          return user
        })
        return updatedUsers.filter(user => !user.verified)
      })
      
      setModalContent({ text: 'User Approved!', icon: <Check className="text-green-500 w-12 h-12" /> })
      setTimeout(() => {
        setModalContent(null)
        setSelectedUser(null)
      }, 2000)

    } catch (error) {
      console.error('Error approving user:', error)
      setModalContent({ 
        text: 'Failed to approve user. Please try again.', 
        icon: <X className="text-red-500 w-12 h-12" /> 
      })
      setTimeout(() => {
        setModalContent(null)
      }, 2000)
    }
  }

  const handleReject = (id, event) => {
    event.stopPropagation()
    setUserToReject(id)
    setShowRejectModal(true)
  }

  const confirmReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }

    try {
      const response = await fetch('https://medwell-admin-backend.vercel.app/api/users/getUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userToReject,
          verified: false,
          rejection_reason: rejectionReason
        })
      })

      if (!response.ok) {
        throw new Error('Failed to reject user')
      }

      setModalContent({ 
        text: `User Rejected! Reason: ${rejectionReason}`, 
        icon: <X className="text-red-500 w-12 h-12" /> 
      })
      
      setTimeout(() => {
        setModalContent(null)
        setUsers(users.filter(user => user.id !== userToReject))
        setSelectedUser(null)
        setShowRejectModal(false)
        setRejectionReason('')
        setUserToReject(null)
      }, 2000)
    } catch (error) {
      console.error('Error rejecting user:', error)
      setModalContent({ 
        text: 'Failed to reject user. Please try again.', 
        icon: <X className="text-red-500 w-12 h-12" /> 
      })
      setTimeout(() => {
        setModalContent(null)
      }, 2000)
    }
  }

  const handleRowClick = (user) => {
    if (selectedUser?.id === user.id) {
      setSelectedUser(null)
      setSelectedDocument(null)
    } else {
      setSelectedUser(user)
      setSelectedDocument(null)
    }
  }

  const handleDocumentClick = (doc, event) => {
    event.stopPropagation()
    setSelectedDocument(selectedDocument === doc ? null : doc)
  }

  const onDocumentLoadSuccess = () => {
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
        <div className="overflow-x-auto">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <React.Fragment key={user.id}>
                    <motion.tr 
                      onClick={() => handleRowClick(user)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        <div className="max-w-[150px] sm:max-w-none truncate">{user.name}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex items-center">
                          {user.type === 'doctor' ? <User className="mr-2 text-blue-500" /> : <Hospital className="mr-2 text-green-500" />}
                          <span className="hidden sm:inline">{user.type.charAt(0).toUpperCase() + user.type.slice(1)}</span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <div className="max-w-[200px] truncate">
                          {user.type === 'doctor' ? user.specialty : user.location}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <button 
                            onClick={(e) => handleApprove(user.id, e)} 
                            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 whitespace-nowrap"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={(e) => handleReject(user.id, e)} 
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 whitespace-nowrap"
                          >
                            Reject
                          </button>
                        </div>
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
                              <div className="space-y-8">
                                <div>
                                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Information</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <p className="text-base text-gray-600 dark:text-gray-300">
                                        <strong>Name:</strong> {user.name}
                                      </p>
                                      <p className="text-base text-gray-600 dark:text-gray-300">
                                        <strong>Email:</strong> {user.email}
                                      </p>
                                      <p className="text-base text-gray-600 dark:text-gray-300">
                                        <strong>Phone:</strong> {user.phone}
                                      </p>
                                      {user.type === 'doctor' ? (
                                        <>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Age:</strong> {user.age}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Specialty:</strong> {user.specialty}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Experience:</strong> {user.experience}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Education:</strong> {user.education}
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Location:</strong> {user.location}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Beds:</strong> {user.beds}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Emergency Services:</strong> {user.emergencyServices}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Specialties:</strong> {user.specialties}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      {user.type === 'doctor' ? (
                                        <>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Languages:</strong> {user.languages}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Certifications:</strong> {user.certifications}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Publications:</strong> {user.publications}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Research Interests:</strong> {user.researchInterests}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Professional Memberships:</strong> {user.professionalMemberships}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Awards:</strong> {user.awards}
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Parking Available:</strong> {user.parkingAvailable}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Insurance Accepted:</strong> {user.insuranceAccepted}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Medical School:</strong> {user.medicalSchool}
                                          </p>
                                          <p className="text-base text-gray-600 dark:text-gray-300">
                                            <strong>Wheelchair Facilities:</strong> {user.wheelchairFacilities}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Documents</h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {user.documents.map((doc, index) => (
                                      <button
                                        key={index}
                                        onClick={(e) => handleDocumentClick(doc, e)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-md transition-colors ${
                                          selectedDocument === doc
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100'
                                            : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                        }`}
                                      >
                                        <FileText className="w-8 h-8 mb-2" />
                                        <span className="text-sm text-center">{doc.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                {selectedDocument && selectedDocument.url !== 'No Pdf Available' && (
                                  <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                      {selectedDocument.name}
                                    </h4>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-[600px] overflow-auto">
                                      <Document
                                        file={selectedDocument.url}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        className="max-w-full"
                                      >
                                        <Page pageNumber={1} width={Math.min(600, window.innerWidth - 64)} />
                                      </Document>
                                    </div>
                                  </div>
                                )}
                                {selectedDocument && selectedDocument.url === 'No Pdf Available' && (
                                  <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                      {selectedDocument.name}
                                    </h4>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                                      <p className="text-gray-600 dark:text-gray-300">No PDF available for this document.</p>
                                    </div>
                                  </div>
                                )}
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
      </div>

      {/* Modals */}
      <AnimatePresence mode="wait">
        {modalContent && (
          <motion.div 
            key="modal-content"
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

        {showRejectModal && (
          <motion.div 
            key="reject-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Reject User</h2>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-700 dark:text-white"
                rows="4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setRejectionReason('')
                    setUserToReject(null)
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Confirm Reject
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default Users


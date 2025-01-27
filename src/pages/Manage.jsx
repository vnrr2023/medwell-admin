import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Hospital, User, FileText, Users, Briefcase } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
import Layout from "../components/Layout"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const mockUsers = [
  {
    id: 1,
    name: "Dr. John Doe",
    type: "doctor",
    specialty: "Cardiology",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    age: 45,
    experience: "15 years",
    education: "St. Xaviers",
    languages: "English",
    certifications: "Board Certified in Cardiology",
    publications: "DIS ki book",
    researchInterests: "Uska Heart",
    professionalMemberships: "Anjuman Medical Engineers",
    awards: "Oscar",
    documents: [
      {
        name: "Medical License",
        url: "No Pdf Available",
      },
      {
        name: "Board Certification",
        url: "No Pdf Available",
      },
      {
        name: "Aadhar Card",
        url: "No Pdf Available",
      },
      {
        name: "Resume",
        url: "No Pdf Available",
      },
    ],
  },
  {
    id: 2,
    name: "City Hospital",
    type: "hospital",
    location: "New York",
    email: "info@cityhospital.com",
    phone: "987-654-3210",
    beds: 500,
    emergencyServices: "Yes",
    specialties: "All",
    parkingAvailable: "Yes",
    insuranceAccepted: "Yes",
    medicalSchool: "Yes",
    wheelchairFacilities: "Yes",
    documents: [
      {
        name: "Hospital License",
        url: "No Pdf Available",
      },
      {
        name: "Accreditation Certificate",
        url: "No Pdf Available",
      },
    ],
  },
  {
    id: 3,
    name: "Admin User",
    type: "admin",
    email: "admin@example.com",
    phone: "555-123-4567",
    role: "System Administrator",
    department: "IT",
    accessLevel: "Full",
    lastLogin: "2023-06-15 09:30:00",
    documents: [
      {
        name: "ID Badge",
        url: "No Pdf Available",
      },
      {
        name: "Access Logs",
        url: "No Pdf Available",
      },
    ],
  },
  {
    id: 4,
    name: "John Smith",
    type: "patient",
    email: "john.smith@example.com",
    phone: "777-888-9999",
    age: 35,
    bloodType: "A+",
    allergies: "Penicillin",
    lastVisit: "2023-05-20",
    documents: [
      {
        name: "Medical History",
        url: "No Pdf Available",
      },
      {
        name: "Insurance Card",
        url: "No Pdf Available",
      },
    ],
  },
]

const Manage = () => {
  const [users, setUsers] = useState(mockUsers)
  const [filter, setFilter] = useState("all")
  const [modalContent, setModalContent] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const filteredUsers = filter === "all" ? users : users.filter((user) => user.type === filter)

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
    // Handle successful document load
  }

  const getIcon = (type) => {
    switch (type) {
      case "doctor":
        return <User className="mr-2 text-blue-500" />
      case "hospital":
        return <Hospital className="mr-2 text-green-500" />
      case "admin":
        return <Briefcase className="mr-2 text-purple-500" />
      case "patient":
        return <Users className="mr-2 text-yellow-500" />
      default:
        return null
    }
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
            <option value="admin">Admins</option>
            <option value="doctor">Doctors</option>
            <option value="hospital">Hospitals</option>
            <option value="patient">Patients</option>
          </select>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Details
                </th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 flex items-center">
                      {getIcon(user.type)}
                      {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.type === "doctor"
                        ? user.specialty
                        : user.type === "hospital"
                          ? user.location
                          : user.type === "admin"
                            ? user.role
                            : user.type === "patient"
                              ? `Last visit: ${user.lastVisit}`
                              : ""}
                    </td>
                  </motion.tr>
                  <AnimatePresence>
                    {selectedUser?.id === user.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <td colSpan={3} className="px-6 py-4">
                          <motion.div
                            className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                  Key Information
                                </h3>
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
                                    {user.type === "doctor" && (
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
                                      </>
                                    )}
                                    {user.type === "hospital" && (
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
                                      </>
                                    )}
                                    {user.type === "admin" && (
                                      <>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Role:</strong> {user.role}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Department:</strong> {user.department}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Access Level:</strong> {user.accessLevel}
                                        </p>
                                      </>
                                    )}
                                    {user.type === "patient" && (
                                      <>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Age:</strong> {user.age}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Blood Type:</strong> {user.bloodType}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Allergies:</strong> {user.allergies}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    {user.type === "doctor" && (
                                      <>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Education:</strong> {user.education}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Languages:</strong> {user.languages}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Certifications:</strong> {user.certifications}
                                        </p>
                                      </>
                                    )}
                                    {user.type === "hospital" && (
                                      <>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Specialties:</strong> {user.specialties}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Parking Available:</strong> {user.parkingAvailable}
                                        </p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Insurance Accepted:</strong> {user.insuranceAccepted}
                                        </p>
                                      </>
                                    )}
                                    {user.type === "admin" && (
                                      <>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Last Login:</strong> {user.lastLogin}
                                        </p>
                                      </>
                                    )}
                                    {user.type === "patient" && (
                                      <>
                                        <p className="text-base text-gray-600 dark:text-gray-300">
                                          <strong>Last Visit:</strong> {user.lastVisit}
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
                                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
                                          : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                      }`}
                                    >
                                      <FileText className="w-8 h-8 mb-2" />
                                      <span className="text-sm text-center">{doc.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              {selectedDocument && selectedDocument.url !== "No Pdf Available" && (
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
                              {selectedDocument && selectedDocument.url === "No Pdf Available" && (
                                <div className="mt-6">
                                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    {selectedDocument.name}
                                  </h4>
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                                    <p className="text-gray-600 dark:text-gray-300">
                                      No PDF available for this document.
                                    </p>
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

export default Manage


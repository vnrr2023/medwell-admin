import React, { useState } from 'react';
import Layout from "../components/Layout";
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user, updateUserContact } = useAuth();
  const [maintenanceMessage, setMaintenanceMessage] = useState("")
  const [patchNotes, setPatchNotes] = useState("")
  const [editingContact, setEditingContact] = useState(false);
  const [newPhone, setNewPhone] = useState(user?.phone || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [taskDescription, setTaskDescription] = useState("")
  const [selectedAdmin, setSelectedAdmin] = useState("")

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdatePassword = () => {
    // Logic to update password
    console.log("Updating password");
  };

  const mockAuditLogs = [
    { id: 1, action: "Updated system settings", timestamp: "2023-06-10 14:30:00" },
    { id: 2, action: "Sent patch notes", timestamp: "2023-06-09 11:15:00" },
    { id: 3, action: "Changed admin contact information", timestamp: "2023-06-08 09:45:00" },
  ]

  const mockAdmins = ["Vivek", "Nishikant", "Rehan", "Rohit"]

  const handleServerShutdown = () => {
    console.log("Server shutting down. Maintenance message:", maintenanceMessage)
  }

  const handleSendPatchNotes = () => {
    console.log("Sending patch notes:", patchNotes)
  }

  const handleUpdateAdminContact = () => {
    updateUserContact(newPhone, newEmail);
    setEditingContact(false);
  }

  const handleAssignTask = () => {
    console.log("Assigning task to", selectedAdmin, ":", taskDescription)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          
          {/* Server Maintenance */}
          <div className="bg-[#1e293b] rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Server Maintenance</h2>
              <p className="text-gray-400 text-sm">Shut down the server for maintenance</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="maintenance-message" className="block text-sm font-medium text-gray-200">
                  Maintenance Message
                </label>
                <textarea
                  id="maintenance-message"
                  value={maintenanceMessage}
                  onChange={(e) => setMaintenanceMessage(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                  placeholder="Enter maintenance message"
                ></textarea>
              </div>
              <button 
                onClick={handleServerShutdown}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Shut Down Server
              </button>
            </div>
          </div>

          {/* Patch Notes */}
          <div className="bg-[#1e293b] rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Patch Notes</h2>
              <p className="text-gray-400 text-sm">Send patch notes to all users</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="patch-notes" className="block text-sm font-medium text-gray-200">
                  Patch Notes
                </label>
                <textarea
                  id="patch-notes"
                  value={patchNotes}
                  onChange={(e) => setPatchNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                  placeholder="Enter patch notes"
                ></textarea>
              </div>
              <button 
                onClick={handleSendPatchNotes}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Send Patch Notes
              </button>
            </div>
          </div>

          {/* Admin Contact Information */}
          <div className="bg-[#1e293b] rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Admin Contact Information</h2>
              <p className="text-gray-400 text-sm">View and update your contact details</p>
            </div>
            <div className="space-y-4">
              {editingContact ? (
                <>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-200">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                    />
                  </div>
                  <button 
                    onClick={handleUpdateAdminContact}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {user?.username}</p>
                  <p><strong>Phone:</strong> {user?.phone}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <button 
                    onClick={() => setEditingContact(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Edit Contact Info
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-[#1e293b] rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Audit Logs</h2>
              <p className="text-gray-400 text-sm">Recent actions performed by this admin</p>
            </div>
            <ul className="space-y-3">
              {mockAuditLogs.map(log => (
                <li key={log.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-200">{log.action}</span>
                  <span className="text-gray-400 text-sm">{log.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Assign Tasks */}
          <div className="bg-[#1e293b] rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Assign Tasks</h2>
              <p className="text-gray-400 text-sm">Request help or assign tasks to other admins</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="admin-select" className="block text-sm font-medium text-gray-200">
                  Select Admin
                </label>
                <select
                  id="admin-select"
                  value={selectedAdmin}
                  onChange={(e) => setSelectedAdmin(e.target.value)}
                  className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                >
                  <option value="">Select an admin</option>
                  {mockAdmins.map(admin => (
                    <option key={admin} value={admin}>{admin}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="task-description" className="block text-sm font-medium text-gray-200">
                  Task Description
                </label>
                <textarea
                  id="task-description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                  placeholder="Describe the task or help needed"
                ></textarea>
              </div>
              <button 
                onClick={handleAssignTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Assign Task
              </button>
            </div>
          </div>

          {/* Update Password */}
          <div className="bg-[#1e293b] rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Update Password</h2>
              <p className="text-gray-400 text-sm">Change your account password</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-200">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    id="current-password"
                    className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPassword.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-200">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    id="new-password"
                    className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPassword.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-200">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    id="confirm-password"
                    className="mt-1 w-full rounded-md bg-[#1e293b] text-white p-2 border border-gray-600"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPassword.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <button 
                onClick={handleUpdatePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;


import React, { useState } from 'react';
import { Sun, Moon, Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, darkMode, toggleTheme } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
 
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div className={`bg-white dark:bg-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 border-r border-gray-200 dark:border-gray-700`}>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-200 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Medwell Admin</h2>
          <nav className="mt-10">
            <Link to="/home" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/home' ? 'bg-blue-500 text-white' : 'text-gray-500 dark:text-gray-200 hover:bg-blue-500 hover:text-white'}`}>Dashboard</Link>
            <Link to="/requests" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/requests' ? 'bg-blue-500 text-white' : 'text-gray-500 dark:text-gray-200 hover:bg-blue-500 hover:text-white'}`}>Requests</Link>
            <Link to="/manage" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/manage' ? 'bg-blue-500 text-white' : 'text-gray-500 dark:text-gray-200 hover:bg-blue-500 hover:text-white'}`}>Manage</Link>
            <Link to="/settings" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/settings' ? 'bg-blue-500 text-white' : 'text-gray-500 dark:text-gray-200 hover:bg-blue-500 hover:text-white'}`}>Settings</Link>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              {darkMode ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
              {darkMode ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 dark:text-gray-200 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 md:hidden mr-4">
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)}</h1>
              </div>
              <div className="relative w-full max-w-xs">
                <input type="text" placeholder="Search..." className="w-full bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
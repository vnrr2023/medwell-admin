import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Apply dark mode class to html element on initial load
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const login = (username, password) => {
    if (username === 'rehan' && password === 'medwell') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, darkMode, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};
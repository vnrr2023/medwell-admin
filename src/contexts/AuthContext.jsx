import React, { createContext, useState, useContext, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [darkMode, setDarkMode] = useState(true);
  const [incorrectAttempts, setIncorrectAttempts] = useState(() => {
    const saved = localStorage.getItem('incorrect_login_attempts');
    return saved ? JSON.parse(saved) : { count: 0, date: new Date().toDateString() };
  });
  const [adminSessions, setAdminSessions] = useState(() => {
    const saved = localStorage.getItem('admin_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('incorrect_login_attempts', JSON.stringify(incorrectAttempts));
  }, [incorrectAttempts]);

  useEffect(() => {
    localStorage.setItem('admin_sessions', JSON.stringify(adminSessions));
  }, [adminSessions]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const updateIncorrectAttempts = () => {
    const today = new Date().toDateString();
    if (incorrectAttempts.date === today) {
      setIncorrectAttempts(prev => ({
        count: prev.count + 1,
        date: today
      }));
    } else {
      setIncorrectAttempts({
        count: 1,
        date: today
      });
    }
  };

  const updateAdminSessions = (username) => {
    const now = new Date();
    const newSession = {
      admin: username,
      startTime: now.getTime(),
      duration: "0m"
    };
    setAdminSessions(prev => {
      const filtered = prev.filter(session => session.admin !== username);
      return [...filtered, newSession];
    });
  };

  const updateSessionDuration = () => {
    setAdminSessions(prev => prev.map(session => ({
      ...session,
      duration: formatDuration(Date.now() - session.startTime)
    })));
  };

  const formatDuration = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  useEffect(() => {
    const interval = setInterval(updateSessionDuration, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const login = async (username, password) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) throw error;

      if (data) {
        setUser(data);
        updateAdminSessions(username);
        return true;
      }
      updateIncorrectAttempts();
      return false;
    } catch (error) {
      console.error('Login error:', error);
      updateIncorrectAttempts();
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAdminSessions(prev => prev.filter(session => session.admin !== user?.username));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const updateUserContact = async (newPhone, newEmail) => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .update({ phone: newPhone, email: newEmail })
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error('Update error:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      darkMode, 
      toggleTheme, 
      updateUserContact,
      incorrectAttempts: incorrectAttempts.count,
      adminSessions
    }}>
      {children}
    </AuthContext.Provider>
  );
};


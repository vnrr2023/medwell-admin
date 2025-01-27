import React, { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(true) 

  const users = {
    Vivek: { password: "Lavanya", phone: "+91 75063 75933", email: "vivek@gmail.com" },
    Nishi: { password: "Nabila", phone: "+91 93240 52342", email: "nishi@gmail.com" },
    Rehan: { password: "Ayesha", phone: "+91 98331 65762", email: "rehan@gmail.com" },
    Rohit: { password: "koi nahi hai", phone: "+91 98923 62829", email: "rohit@gmail.com" },
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const login = (username, password) => {
    const userKey = Object.keys(users).find((key) => key.toLowerCase() === username.toLowerCase())
    const user = users[userKey]
    if (user && user.password === password) {
      setUser({ username: userKey, ...user })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const updateUserContact = (newPhone, newEmail) => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        phone: newPhone,
        email: newEmail,
      }))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, darkMode, toggleTheme, updateUserContact }}>
      {children}
    </AuthContext.Provider>
  )
}


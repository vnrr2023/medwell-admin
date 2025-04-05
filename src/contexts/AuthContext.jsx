import React, { createContext, useState, useContext, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(true) 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const login = async (username, password) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single()

      if (error) throw error

      if (data) {
        setUser(data)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const updateUserContact = async (newPhone, newEmail) => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .update({ phone: newPhone, email: newEmail })
          .eq('id', user.id)
          .select()
          .single()

        if (error) throw error

        if (data) {
          setUser(data)
        }
      } catch (error) {
        console.error('Update error:', error)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, darkMode, toggleTheme, updateUserContact }}>
      {children}
    </AuthContext.Provider>
  )
}


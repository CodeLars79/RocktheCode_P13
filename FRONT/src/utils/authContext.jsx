import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    console.log('Checking localStorage token:', storedToken)
    if (storedToken) {
      setToken(storedToken)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (newToken) => {
    console.log('Saving token:', newToken)
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setIsLoggedIn(true)
  }

  const logout = () => {
    console.log('Clearing token')
    localStorage.removeItem('token')
    setToken(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

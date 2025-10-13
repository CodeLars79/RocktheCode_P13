import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/apiFetch'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Regular login
  const login = async (email, password, redirect = '/') => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (result.user.role === 'ADMIN') {
        throw new Error('Admins must use the admin login page')
      }

      localStorage.setItem('token', result.token)
      setUser(result.user)

      navigate(redirect)
      return result
    } catch (err) {
      setError(err.message || 'Login failed')
      console.error('Login error:', err)
      throw new Error(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // Admin login
  const adminLogin = async (email, password, redirect = '/admin-dashboard') => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFetch('/users/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      localStorage.setItem('token', result.token)
      setUser(result.user)

      navigate(redirect)
      return result
    } catch (err) {
      setError(err.message || 'Login failed')
      console.error('Admin login error:', err)
      throw new Error(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }, [navigate])

  const getToken = () => localStorage.getItem('token')

  const fetchUser = async () => {
    const token = getToken()
    if (!token) return null

    try {
      const result = await apiFetch('/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(result)
      return result
    } catch (err) {
      console.error('Error fetching user:', err)
      logout()
      return null
    }
  }

  const getUser = () => user

  return {
    user,
    login,
    adminLogin,
    logout,
    getUser,
    fetchUser,
    getToken,
    loading,
    error
  }
}

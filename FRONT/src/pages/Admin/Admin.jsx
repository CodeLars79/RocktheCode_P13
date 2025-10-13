import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import { useAuth } from '../../hooks/useAuth'
import Alert from '../../components/Alert/Alert.jsx'
import { useNavigate } from 'react-router-dom'
import '../Login/Login.css'

const AdminLogin = () => {
  const { adminLogin, loading } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/admin-dashboard')
    }
  }, [navigate])

  const onSubmit = async (data) => {
    try {
      const user = await adminLogin(data.email, data.password)
      navigate('/admin-dashboard')
    } catch (err) {
      if (err.response?.status === 403) {
        setAlertMessage('Access denied: Admins only')
      } else {
        setAlertMessage(err.message || 'Login failed')
      }
      setShowAlert(true)
    }
  }

  return (
    <div className='login-page'>
      <form className='login-regular' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='login-regular_title'>ADMIN LOGIN</h2>

        <div className='login-regular_fields'>
          <label className='login-regular_label'>Email</label>
          <input
            className='login-regular_input'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid'
              }
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}

          <label className='login-regular_label'>Password</label>
          <input
            className='login-regular_input'
            type='password'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Min 8 characters' }
            })}
          />
          {errors.password && (
            <p className='error'>{errors.password.message}</p>
          )}

          <div className='login-regular_button-wrapper'>
            <Button
              text={loading ? 'Logging in...' : 'Login'}
              size='large'
              variant='primary'
              type='submit'
            />
          </div>
        </div>
      </form>

      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          onConfirm={() => setShowAlert(false)}
        />
      )}
    </div>
  )
}

export default AdminLogin

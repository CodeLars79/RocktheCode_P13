import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import { useAuth } from '../../hooks/useAuth'
import Alert from '../../components/Alert/Alert.jsx'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch (err) {
      setAlertMessage(err.message || 'Login failed')
      setShowAlert(true)
    }
  }

  return (
    <div className='login-page'>
      <form className='login-regular' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='login-regular_title'>LOGIN</h2>

        <div className='login-regular_fields'>
          <label className='login-regular_label'>Email</label>
          <input
            type='email'
            className='login-regular_input'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid'
              }
            })}
          />
          {errors.email && (
            <p className='login-regular_error'>{errors.email.message}</p>
          )}

          <label className='login-regular_label'>Password</label>
          <input
            type='password'
            className='login-regular_input'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Min 8 characters' }
            })}
          />
          {errors.password && (
            <p className='login-regular_error'>{errors.password.message}</p>
          )}
        </div>

        <div className='login-regular_button-wrapper'>
          <Button
            text={loading ? 'Logging in...' : 'Login'}
            size='large'
            variant='primary'
            type='submit'
          />
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

export default Login

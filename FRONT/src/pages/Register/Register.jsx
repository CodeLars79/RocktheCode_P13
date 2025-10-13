import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import { apiFetch } from '../../utils/apiFetch'
import { useState } from 'react'
import Alert from '../../components/Alert/Alert'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const payload = {
        userName: data.name,
        email: data.email,
        password: data.password
      }

      const result = await apiFetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      setAlertMessage('Registration successful! Redirecting to login...')
      setShowAlert(true)
    } catch (error) {
      setAlertMessage(`Registration failed: ${error.message}`)
      setShowAlert(true)
    }
  }

  return (
    <div className='register-page'>
      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          onConfirm={() => {
            setShowAlert(false)
            navigate('/login')
          }}
        />
      )}

      <form className='register_regular' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='register_regular_title'>CREATE ACCOUNT</h2>

        <div className='register_regular_fields'>
          <label className='register_regular_label'>Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type='text'
            className='register_regular_input'
          />
          {errors.name && (
            <p className='register_regular_error'>{errors.name.message}</p>
          )}

          <label className='register_regular_label'>Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid'
              }
            })}
            type='email'
            className='register_regular_input'
          />
          {errors.email && (
            <p className='register_regular_error'>{errors.email.message}</p>
          )}

          <label className='register_regular_label'>Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Min 8 characters' }
            })}
            type='password'
            className='register_regular_input'
          />
          {errors.password && (
            <p className='register_regular_error'>{errors.password.message}</p>
          )}

          <label className='register_regular_label'>Confirm Password</label>
          <input
            {...register('confirmPassword', {
              required: 'Confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match'
            })}
            type='password'
            className='register_regular_input'
          />
          {errors.confirmPassword && (
            <p className='register_regular_error'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className='register_regular_button-wrapper'>
          <Button
            text='Register'
            size='large'
            variant='primary'
            type='submit'
          />
        </div>

        <p className='register_regular_privacy-notice'>
          By registering, you agree to our <a href='/privacy'>Privacy Policy</a>
          .
        </p>
      </form>
    </div>
  )
}

export default Register

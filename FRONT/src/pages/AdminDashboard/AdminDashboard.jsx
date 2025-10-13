import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import Alert from '../../components/Alert/Alert'
import FormCard from '../../components/FormCard/FormCard'
import {
  TextInput,
  SelectInput,
  FileInput
} from '../../components/FormInputs/FormInputs'
import { apiFetch } from '../../utils/apiFetch'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/admin')
    }
  }, [token, navigate])

  const showSuccess = (message) => {
    setAlertMessage(message)
    setShowAlert(true)
  }

  // Forms
  const {
    register: registerCreatePoster,
    handleSubmit: handleSubmitCreatePoster,
    reset: resetCreatePoster,
    formState: { errors: errorsCreatePoster }
  } = useForm()
  const {
    register: registerDeletePoster,
    handleSubmit: handleSubmitDeletePoster,
    reset: resetDeletePoster,
    formState: { errors: errorsDeletePoster }
  } = useForm()
  const {
    register: registerCreateReview,
    handleSubmit: handleSubmitCreateReview,
    reset: resetCreateReview,
    formState: { errors: errorsCreateReview }
  } = useForm()
  const {
    register: registerDeleteReview,
    handleSubmit: handleSubmitDeleteReview,
    reset: resetDeleteReview,
    formState: { errors: errorsDeleteReview }
  } = useForm()

  // CREATE POSTER
  const onCreatePoster = async (data) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('year', data.year || '')
      formData.append('price', data.price || 0)
      formData.append('isFree', data.isfree === 'true')

      const toArray = (value) =>
        value
          ? value
              .split(',')
              .map((v) => v.trim())
              .filter(Boolean)
          : []

      formData.append('color', JSON.stringify(toArray(data.color)))
      formData.append('format', JSON.stringify(toArray(data.format)))
      formData.append('orientation', JSON.stringify(toArray(data.orientation)))
      formData.append('style', JSON.stringify(toArray(data.style)))
      formData.append('dimensions', JSON.stringify(toArray(data.dimensions)))

      if (data.image && data.image[0]) formData.append('image', data.image[0])

      const result = await apiFetch(
        '/posters',
        { method: 'POST', body: formData },
        token
      )
      showSuccess('Poster created successfully!')
      resetCreatePoster()
      console.log(result)
    } catch (error) {
      console.error('Error creating poster:', error)
      setAlertMessage(error.message || 'Error creating poster')
      setShowAlert(true)
    }
  }

  // DELETE POSTER
  const onDeletePoster = async (data) => {
    try {
      const result = await apiFetch(
        `/posters/${data.idToDelete}`,
        { method: 'DELETE' },
        token
      )
      showSuccess('Poster deleted successfully!')
      resetDeletePoster()
      console.log(result)
    } catch (error) {
      console.error('Error deleting poster:', error)
      setAlertMessage(error.message || 'Error deleting poster')
      setShowAlert(true)
    }
  }

  // CREATE REVIEW
  const onCreateReview = async (data) => {
    try {
      const reviewData = {
        name: data.name,
        text: data.text,
        rating: data.rating ? Number(data.rating) : 5
      }
      const result = await apiFetch(
        '/reviews',
        {
          method: 'POST',
          body: JSON.stringify(reviewData),
          headers: { 'Content-Type': 'application/json' }
        },
        token
      )
      showSuccess('Review created successfully!')
      resetCreateReview()
      console.log(result)
    } catch (error) {
      console.error('Error creating review:', error)
      setAlertMessage(error.message || 'Error creating review')
      setShowAlert(true)
    }
  }

  // DELETE REVIEW
  const onDeleteReview = async (data) => {
    try {
      const result = await apiFetch(
        `/reviews/${data.reviewId}`,
        { method: 'DELETE' },
        token
      )
      showSuccess('Review deleted successfully!')
      resetDeleteReview()
      console.log(result)
    } catch (error) {
      console.error('Error deleting review:', error)
      setAlertMessage(error.message || 'Error deleting review')
      setShowAlert(true)
    }
  }

  const colorOptions = ['Black', 'Earth', 'Mint', 'Sand', 'Sky', 'Sun', 'White']
  const formatOptions = ['jpg', 'svg']
  const orientationOptions = ['Landscape', 'Portrait', 'Square', 'Circle']
  const styleOptions = ['Illustration', 'Abstract', 'Typography']
  const dimensionsOptions = ['20,30', '30,40', '50,50']
  const priceOptions = ['10', '20', '30']
  const ratingOptions = [1, 2, 3, 4, 5]

  return (
    <div className='dashboard-page'>
      <h2>Welcome, Admin!</h2>

      <FormCard title='Create Poster'>
        <form onSubmit={handleSubmitCreatePoster(onCreatePoster)}>
          <TextInput
            label='Title'
            register={registerCreatePoster}
            required={{ required: 'Title is required' }}
            error={errorsCreatePoster.title}
          />
          <TextInput
            label='Year'
            register={registerCreatePoster}
            type='number'
          />
          <SelectInput
            label='Color'
            register={registerCreatePoster}
            options={colorOptions}
          />
          <SelectInput
            label='Format'
            register={registerCreatePoster}
            options={formatOptions}
          />
          <SelectInput
            label='Orientation'
            register={registerCreatePoster}
            options={orientationOptions}
          />
          <SelectInput
            label='Style'
            register={registerCreatePoster}
            options={styleOptions}
          />
          <SelectInput
            label='Dimensions'
            register={registerCreatePoster}
            options={dimensionsOptions}
          />
          <SelectInput
            label='Price'
            register={registerCreatePoster}
            options={priceOptions}
          />
          <SelectInput
            label='IsFree'
            register={registerCreatePoster}
            options={['true', 'false']}
          />
          <FileInput
            label='Image'
            register={registerCreatePoster}
            required={{ required: 'Image is required' }}
            error={errorsCreatePoster.image}
          />
          <div className='button-wrapper'>
            <Button text='Create Poster' type='submit' variant='primary' />
          </div>
        </form>
      </FormCard>

      <FormCard title='Delete Poster'>
        <form onSubmit={handleSubmitDeletePoster(onDeletePoster)}>
          <TextInput
            label='Poster ID'
            name='idToDelete'
            register={registerDeletePoster}
            required={{ required: 'ID is required' }}
            error={errorsDeletePoster.idToDelete}
          />
          <div className='button-wrapper'>
            <Button text='Delete Poster' type='submit' variant='primary' />
          </div>
        </form>
      </FormCard>

      <FormCard title='Create Review'>
        <form onSubmit={handleSubmitCreateReview(onCreateReview)}>
          <TextInput
            label='Name'
            register={registerCreateReview}
            required={{ required: 'Name is required' }}
            error={errorsCreateReview.name}
          />
          <TextInput
            label='Text'
            register={registerCreateReview}
            required={{ required: 'Text is required' }}
            error={errorsCreateReview.text}
          />
          <SelectInput
            label='Rating'
            register={registerCreateReview}
            options={ratingOptions}
          />
          <div className='button-wrapper'>
            <Button text='Create Review' type='submit' variant='primary' />
          </div>
        </form>
      </FormCard>

      <FormCard title='Delete Review'>
        <form onSubmit={handleSubmitDeleteReview(onDeleteReview)}>
          <TextInput
            label='Review ID'
            name='reviewId'
            register={registerDeleteReview}
            required={{ required: 'Review ID is required' }}
            error={errorsDeleteReview.reviewId}
          />
          <div className='button-wrapper'>
            <Button text='Delete Review' type='submit' variant='primary' />
          </div>
        </form>
      </FormCard>

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

export default AdminDashboard

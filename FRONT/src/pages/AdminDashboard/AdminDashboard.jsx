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
    if (!token) navigate('/admin')
  }, [token, navigate])

  const showSuccess = (message) => {
    setAlertMessage(message)
    setShowAlert(true)
  }

  // CREATE POSTER FORM
  const {
    register: registerCreatePoster,
    handleSubmit: handleSubmitCreatePoster,
    reset: resetCreatePoster,
    formState: { errors: errorsCreatePoster }
  } = useForm()

  // CREATE REVIEW FORM
  const {
    register: registerCreateReview,
    handleSubmit: handleSubmitCreateReview,
    reset: resetCreateReview,
    formState: { errors: errorsCreateReview }
  } = useForm()

  // CREATE POSTER HANDLER
  const onCreatePoster = async (data) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('year', data.year)
      formData.append('price', data.price || 0)
      formData.append('isFree', data.isfree === 'true')

      formData.append('color', JSON.stringify([data.color]))
      formData.append('format', JSON.stringify([data.format]))
      formData.append('orientation', JSON.stringify([data.orientation]))
      formData.append('style', JSON.stringify([data.style]))
      formData.append('dimensions', JSON.stringify([data.dimensions]))

      if (data.image?.[0]) {
        formData.append('image', data.image[0])
      }

      await apiFetch('/posters', { method: 'POST', body: formData }, token)
      showSuccess('Poster created successfully!')
      resetCreatePoster()
    } catch (error) {
      setAlertMessage(error.message || 'Error creating poster')
      setShowAlert(true)
    }
  }

  // CREATE REVIEW HANDLER
  const onCreateReview = async (data) => {
    try {
      const reviewData = {
        name: data.name,
        text: data.text,
        rating: Number(data.rating)
      }

      await apiFetch(
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
    } catch (error) {
      setAlertMessage(error.message || 'Error creating review')
      setShowAlert(true)
    }
  }

  // Select options
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

      {/* CREATE POSTER */}
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
            type='number'
            register={registerCreatePoster}
            required={{ required: 'Year is required' }}
            error={errorsCreatePoster.year}
          />

          <SelectInput
            label='Color'
            register={registerCreatePoster}
            options={colorOptions}
            required={{ required: 'Color is required' }}
            error={errorsCreatePoster.color}
          />

          <SelectInput
            label='Format'
            register={registerCreatePoster}
            options={formatOptions}
            required={{ required: 'Format is required' }}
            error={errorsCreatePoster.format}
          />

          <SelectInput
            label='Orientation'
            register={registerCreatePoster}
            options={orientationOptions}
            required={{ required: 'Orientation is required' }}
            error={errorsCreatePoster.orientation}
          />

          <SelectInput
            label='Style'
            register={registerCreatePoster}
            options={styleOptions}
            required={{ required: 'Style is required' }}
            error={errorsCreatePoster.style}
          />

          <SelectInput
            label='Dimensions'
            register={registerCreatePoster}
            options={dimensionsOptions}
            required={{ required: 'Dimensions are required' }}
            error={errorsCreatePoster.dimensions}
          />

          <SelectInput
            label='Price'
            register={registerCreatePoster}
            options={priceOptions}
            required={{ required: 'Price is required' }}
            error={errorsCreatePoster.price}
          />

          <SelectInput
            label='IsFree'
            register={registerCreatePoster}
            options={['true', 'false']}
            required={{ required: 'IsFree is required' }}
            error={errorsCreatePoster.isfree}
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

      {/* CREATE REVIEW */}
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
            required={{ required: 'Rating is required' }}
            error={errorsCreateReview.rating}
          />

          <div className='button-wrapper'>
            <Button text='Create Review' type='submit' variant='primary' />
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

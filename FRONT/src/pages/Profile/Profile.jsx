import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../utils/apiFetch'
import PosterCard from '../../components/PosterCard/PosterCard.jsx'
import Button from '../../components/Button/Button.jsx'
import Alert from '../../components/Alert/Alert.jsx'

import '../../components/PosterCard/PosterCard.css'
import './Profile.css'

const Profile = () => {
  const { getToken, logout } = useAuth()
  const token = getToken()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const [alertMessage, setAlertMessage] = useState('')
  const [alertCallback, setAlertCallback] = useState(() => {})
  const [showCancel, setShowCancel] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return

      try {
        const userData = await apiFetch('/users/me', {}, token)
        setUser(userData)

        const favData = await apiFetch('/favorites', {}, token)
        setFavorites(favData)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setAlertMessage('Failed to load profile. Please log in again.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDeleteProfile = () => {
    setAlertMessage(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    )
    setShowCancel(true)
    setAlertCallback(() => async () => {
      try {
        await apiFetch(`/users/me`, { method: 'DELETE' }, token)
        logout()
        navigate('/')
      } catch (error) {
        console.error('Error deleting user:', error)
        setAlertMessage(`Error deleting user: ${error.message}`)
        setShowCancel(false)
      }
    })
  }

  if (!token) {
    return (
      <div className='profile-container'>
        <p>You need to be logged in to view your profile.</p>
      </div>
    )
  }

  const posterList = favorites
    .filter((fav) => fav.poster)
    .map((fav) => fav.poster)

  return (
    <div className='profile-container'>
      <h1>Hello, {user?.userName || 'User'} </h1>

      <section className='favorites-section'>
        <h2>Your Favorite Posters</h2>
        {loading ? (
          <p>Loading favorites...</p>
        ) : posterList.length === 0 ? (
          <p>You haven't added any favorites yet.</p>
        ) : (
          <div className='favorites-grid'>
            {posterList.map((poster) => (
              <PosterCard
                key={poster._id}
                poster={poster}
                userFavorites={favorites}
                onFavoritesChange={setFavorites}
              />
            ))}
          </div>
        )}
      </section>

      <div className='profile-buttons'>
        <Button
          text='Logout'
          onClick={handleLogout}
          variant='primary'
          size='medium'
          icon={<img src='/assets/arrow.svg' alt='go' />}
        />

        <Button
          text='Delete Profile'
          onClick={handleDeleteProfile}
          variant='secondary'
          size='medium'
          icon={<img src='/assets/arrow.svg' alt='go' />}
        />
      </div>

      {alertMessage && (
        <Alert
          message={alertMessage}
          showCancel={showCancel}
          onClose={() => setAlertMessage('')}
          onConfirm={() => {
            alertCallback()
            setAlertMessage('')
          }}
        />
      )}
    </div>
  )
}

export default Profile

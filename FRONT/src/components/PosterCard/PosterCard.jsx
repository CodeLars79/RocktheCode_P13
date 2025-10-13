import { useContext, useState } from 'react'
import { AuthContext } from '../../utils/authContext.jsx'
import { apiFetch } from '../../utils/apiFetch'
import Alert from '../../components/Alert/Alert.jsx'
import './PosterCard.css'

function isPosterFavorite(favorites, posterId) {
  return favorites?.some((fav) => {
    if (!fav) return false
    const favPosterId =
      typeof fav.poster === 'object' ? fav.poster?._id : fav?.poster
    return favPosterId === posterId
  })
}

const PosterCard = ({ poster, userFavorites, onFavoritesChange }) => {
  const { isLoggedIn, token } = useContext(AuthContext)
  const [isFavorite, setIsFavorite] = useState(
    isPosterFavorite(userFavorites, poster._id)
  )

  const [alertMessage, setAlertMessage] = useState('')
  const [showCancel, setShowCancel] = useState(false)

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      setAlertMessage('You must be logged in to favorite posters.')
      setShowCancel(false)
      return
    }

    try {
      if (isFavorite) {
        await apiFetch(`/favorites/${poster._id}`, { method: 'DELETE' }, token)
        setIsFavorite(false)

        onFavoritesChange?.((prevFavorites) =>
          prevFavorites.filter((fav) => {
            const favPosterId =
              typeof fav.poster === 'object' ? fav.poster?._id : fav?.poster
            return favPosterId !== poster._id
          })
        )
      } else {
        const newFav = await apiFetch(
          '/favorites',
          {
            method: 'POST',
            body: JSON.stringify({ posterId: poster._id })
          },
          token
        )
        setIsFavorite(true)

        onFavoritesChange?.((prevFavorites) => [...prevFavorites, newFav])
      }
    } catch (error) {
      console.error('Error updating favorites:', error)
      setAlertMessage(error.message || 'Could not update favorites.')
      setShowCancel(false)
    }
  }

  const handleDownload = async (e) => {
    e.preventDefault()

    if (!isLoggedIn) {
      setAlertMessage('You must be logged in to download posters.')
      setShowCancel(false)
      return
    }

    if (poster.price > 0) {
      try {
        const response = await apiFetch(
          '/stripe/create-checkout-session',
          {
            method: 'POST',
            body: JSON.stringify({ posterId: poster._id })
          },
          token
        )

        if (response.url) {
          window.location.href = response.url
        } else {
          throw new Error('Stripe checkout session failed.')
        }
      } catch (error) {
        console.error('Error creating checkout session:', error)
        setAlertMessage('Error redirecting to payment.')
        setShowCancel(false)
      }
    } else {
      window.open(poster.image, '_blank')
    }
  }

  const heartSrc = !isLoggedIn
    ? '/assets/heartGrey.png'
    : isFavorite
    ? '/assets/heartFull.png'
    : '/assets/heart.png'

  return (
    <div className='poster-card'>
      <button className='favorite-btn' onClick={toggleFavorite}>
        <img src={heartSrc} alt='favorite' className='heart-icon' />
      </button>

      <div className='poster-image-container'>
        <img src={poster.image} alt={poster.title} />
      </div>

      <div className='poster-info'>
        <h3>{poster.title}</h3>
        <div className='info-bottom'>
          <p>{poster.price === 0 ? 'Free' : `${poster.price} €`}</p>
          <a onClick={handleDownload}>
            <img
              src='/assets/download.png'
              alt='download'
              className='download-icon'
            />
          </a>
        </div>
      </div>

      {alertMessage && (
        <Alert
          message={alertMessage}
          showCancel={showCancel}
          onClose={() => setAlertMessage('')}
        />
      )}
    </div>
  )
}

export default PosterCard

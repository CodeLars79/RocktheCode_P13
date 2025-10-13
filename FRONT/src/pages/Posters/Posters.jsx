import { useState, useEffect, useContext } from 'react'
import './Posters.css'
import getPosters from '../../hooks/getPosters'
import PosterCard from '../../components/PosterCard/PosterCard'
import Button from '../../components/Button/Button'
import Filters from '../../components/Filters/Filters'
import { AuthContext } from '../../utils/authContext.jsx'
import { apiFetch } from '../../utils/apiFetch.js'

const Posters = () => {
  const { posters, loading, error } = getPosters()
  const { isLoggedIn, token } = useContext(AuthContext)
  const [filteredPosters, setFilteredPosters] = useState([])
  const [visibleCount, setVisibleCount] = useState(20)
  const [userFavorites, setUserFavorites] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn || !token) {
        setUserFavorites([])
        return
      }
      try {
        const favorites = await apiFetch('/favorites', {}, token)
        setUserFavorites(favorites)
      } catch (err) {
        console.error('Error fetching favorites:', err)
      }
    }

    fetchFavorites()
  }, [isLoggedIn, token])

  const loadMore = () => setVisibleCount((prev) => prev + 20)

  const displayedPosters = (
    filteredPosters.length > 0 ? filteredPosters : posters
  ).slice(0, visibleCount)

  const handleFavoritesChange = (updateFn) => {
    setUserFavorites(updateFn)
  }

  if (loading) return <p>Loading posters...</p>
  if (error) return <p>Error: {error}</p>
  if (posters.length === 0) return <p>No posters available.</p>

  return (
    <div className='posters-page'>
      <h1>Posters Collection</h1>
      <p>Explore all available posters below.</p>

      <Filters posters={posters} onFilter={setFilteredPosters} />

      <div className='posters-grid'>
        {displayedPosters.map((poster) => (
          <PosterCard
            key={poster._id}
            poster={poster}
            userFavorites={userFavorites}
            onFavoritesChange={setUserFavorites}
          />
        ))}
      </div>

      {visibleCount <
        (filteredPosters.length > 0
          ? filteredPosters.length
          : posters.length) && (
        <div className='load-more-wrapper'>
          <Button
            text='Load More'
            size='medium'
            variant='primary'
            onClick={loadMore}
          />
        </div>
      )}
    </div>
  )
}

export default Posters

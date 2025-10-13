import { useEffect, useState } from 'react'
import { apiFetch } from '../../utils/apiFetch'
import Button from '../../components/Button/Button'

import './NewPosters.css'

const NewPosters = () => {
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewPosters = async () => {
      try {
        const data = await apiFetch('/posters?sort=desc')
        const newest20 = data.slice(-20)
        const random3 = newest20.sort(() => 0.5 - Math.random()).slice(0, 3)

        setPosters(random3)
      } catch (error) {
        console.error('Error fetching new posters:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewPosters()
  }, [])

  return (
    <div className='new-posters'>
      <h2>Newly Added Posters</h2>
      {loading ? (
        <p>Loading posters...</p>
      ) : (
        <>
          <div className='posters-row'>
            {posters.map((poster) => (
              <div key={poster._id} className='poster-wrapper'>
                <span className='new-label'>NEW</span>
                <img
                  src={poster.image}
                  alt={poster.title}
                  className='poster-img'
                />
              </div>
            ))}
          </div>

          <div className='new-posters-button'>
            <Button
              text='Explore Art'
              size='large'
              variant='primary'
              icon={<img src='/assets/arrow.svg' alt='get started' />}
              to='/posters'
            />
          </div>
        </>
      )}
    </div>
  )
}

export default NewPosters

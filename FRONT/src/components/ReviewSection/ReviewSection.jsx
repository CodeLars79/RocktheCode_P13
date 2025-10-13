import { useEffect, useState } from 'react'
import './ReviewSection.css'
import StarIcon from '/assets/star.svg'
import { apiFetch } from '../../utils/apiFetch'

const ReviewSection = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await apiFetch('/reviews')
        setReviews(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) return <p className='review-loading'>Loading reviews...</p>
  if (error) return <p className='review-error'>{error}</p>

  const randomReviews =
    reviews.length <= 3
      ? reviews
      : [...reviews].sort(() => Math.random() - 0.5).slice(0, 3)

  return (
    <section className='review-section'>
      <h2 className='review-title'>What Our Users Say</h2>
      <div className='review-grid'>
        {randomReviews.map((review) => (
          <div key={review._id} className='review-card'>
            <div className='review-stars'>
              {Array.from({ length: review.rating || 5 }).map((_, i) => (
                <img key={i} src={StarIcon} alt='star' className='star-icon' />
              ))}
            </div>
            <p className='review-text'>“{review.text}”</p>
            <p className='review-name'>— {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReviewSection

import { useState, useEffect } from 'react'

const getPosters = () => {
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/posters')
        if (!res.ok) throw new Error('Failed to fetch posters')
        const data = await res.json()

        const shuffled = data.sort(() => Math.random() - 0.5)

        setPosters(shuffled)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosters()
  }, [])

  return { posters, loading, error }
}

export default getPosters

import { useState, useEffect } from 'react'
import './Slider.css'

const images = [
  '/assets/slider01.jpg',
  '/assets/slider02.jpg',
  '/assets/slider03.jpg',
  '/assets/slider04.jpg',
  '/assets/slider05.jpg'
]

const Slider = () => {
  const [current, setCurrent] = useState(0)
  const [shuffledImages, setShuffledImages] = useState([])

  useEffect(() => {
    const shuffled = [...images].sort(() => Math.random() - 0.5)
    setShuffledImages(shuffled)
  }, [])

  useEffect(() => {
    if (shuffledImages.length === 0) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % shuffledImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [shuffledImages])

  return (
    <div className='slider'>
      {shuffledImages.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}
    </div>
  )
}

export default Slider

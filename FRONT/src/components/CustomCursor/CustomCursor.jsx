import { useEffect, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <img
      src='/assets/cursor.svg'
      alt='cursor'
      className='custom-cursor'
      style={{ top: position.y + 44, left: position.x + 48 }}
    />
  )
}

export default CustomCursor

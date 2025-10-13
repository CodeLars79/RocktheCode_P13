import { useNavigate } from 'react-router-dom'
import './Button.css'

export default function Button({
  id,
  text,
  onClick,
  to,
  size = 'medium',
  icon,
  variant = 'primary',
  type = 'button'
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    else if (to) navigate(to)
  }

  return (
    <button
      className={`btn btn-${size} btn-${variant}`}
      id={id}
      type={type}
      onClick={handleClick}
    >
      <span className='btn-text'>{text}</span>
      {icon && <span className='btn-icon'>{icon}</span>}
    </button>
  )
}

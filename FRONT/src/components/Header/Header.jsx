import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getToken, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const token = getToken()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const navigateAndReload = (path) => {
    setMenuOpen(false)
    navigate(path)
    setTimeout(() => {
      window.location.reload()
    }, 50)
  }

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className={`header-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className='logo-wrapper'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active logo' : 'logo')}
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              } else {
                navigate('/')
              }
            }}
          >
            <img src='./assets/logo.svg' alt='Logo' className='logo-img' />
            GOOD URBANITE
          </NavLink>
        </div>

        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`links ${menuOpen ? 'show' : ''}`}>
          <button
            className={window.location.pathname === '/posters' ? 'active' : ''}
            onClick={() => navigateAndReload('/posters')}
          >
            Posters
          </button>

          {!token && (
            <>
              <NavLink
                to='/register'
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </NavLink>
              <NavLink
                to='/login'
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </>
          )}

          {token && (
            <>
              <button
                className={
                  window.location.pathname === '/profile' ? 'active' : ''
                }
                onClick={() => navigateAndReload('/profile')}
              >
                Profile
              </button>

              <button className='logout-btn' onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

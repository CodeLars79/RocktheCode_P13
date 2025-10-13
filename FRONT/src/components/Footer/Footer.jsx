import './Footer.css'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-columns'>
        {/* Column 1: Logo */}
        <div className='footer-column'>
          <img src='./assets/logo.svg' alt='Logo' className='footer-logo' />
        </div>

        {/* Column 2: About */}
        <div className='footer-column'>
          <h4>Good Urbanite</h4>
          <p>Making art accessible</p>
          <p>one poster at a time...</p>
          <p>
            <NavLink to='/about' className='active-link'>
              About
            </NavLink>
          </p>
        </div>

        {/* Column 3: Contact */}
        <div className='footer-column'>
          <h4>Contact</h4>
          <p>E: hello@goodurbanite.com</p>
          <p>T: +34 671 517 887</p>
        </div>

        {/* Column 4: Legal */}
        <div className='footer-column'>
          <h4>Legal</h4>
          <p>
            <NavLink to='/privacy' className='active-link'>
              Privacy Policy
            </NavLink>
          </p>
          <p>
            <NavLink to='/terms' className='active-link'>
              Terms and Conditions
            </NavLink>
          </p>
          <p>
            <NavLink to='/cookies' className='active-link'>
              Cookies
            </NavLink>
          </p>
        </div>

        {/* Column 5: Social Media */}
        <div className='footer-column'>
          <h4>Follow</h4>
          <p>
            <a
              href='https://www.instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </a>
          </p>
          <p>
            <a
              href='https://www.pinterest.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pinterest
            </a>
          </p>
          <p>
            <a
              href='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>

      <div className='footer-copy'>
        &copy; {new Date().getFullYear()} Good Urbanite | web by{' '}
        <a
          href='https://la-rs.com'
          target='_blank'
          rel='noopener noreferrer'
          className='logo-lars'
        >
          la-rs
        </a>
      </div>
    </footer>
  )
}

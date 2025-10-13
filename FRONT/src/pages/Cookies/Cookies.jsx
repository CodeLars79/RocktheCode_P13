import '../Privacy/Legal.css'

const Cookies = () => {
  return (
    <div className='legal-container'>
      <h2>Cookies Policy</h2>
      <p>Last updated: October 5, 2025</p>

      <section>
        <h3>1. What Are Cookies?</h3>
        <p>
          Cookies are small text files stored on your device to help websites
          remember your preferences and improve your experience.
        </p>
      </section>

      <section>
        <h3>2. How We Use Cookies</h3>
        <ul>
          <li>Remember your login session</li>
          <li>Track usage and analytics</li>
          <li>Personalize content and recommendations</li>
        </ul>
      </section>

      <section>
        <h3>3. Your Choices</h3>
        <p>
          You can choose to disable cookies in your browser settings, but some
          parts of the site may not function properly.
        </p>
      </section>

      <section>
        <h3>4. Third-Party Cookies</h3>
        <p>
          We may use third-party services that set cookies for analytics or
          advertising. We do not control these cookies.
        </p>
      </section>

      <section>
        <h3>5. Contact Us</h3>
        <p>
          Questions about cookies? Contact us at{' '}
          <a href='mailto:hello@goodurbanite.com'>hello@goodurbanite.com</a>.
        </p>
      </section>
    </div>
  )
}

export default Cookies

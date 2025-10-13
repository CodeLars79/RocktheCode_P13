import './Legal.css'

const Privacy = () => {
  return (
    <div className='legal-container'>
      <h2>Privacy Policy</h2>
      <p>Last updated: October 5, 2025</p>

      <section>
        <h3>1. Introduction</h3>
        <p>
          Welcome to GOOD URBANITE. Your privacy is important to us. This
          Privacy Policy explains how we collect, use, and protect your personal
          information.
        </p>
      </section>

      <section>
        <h3>2. Information We Collect</h3>
        <ul>
          <li>Personal information you provide (name, email, etc.)</li>
          <li>Usage data, such as pages visited and interactions</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section>
        <h3>3. How We Use Your Information</h3>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Personalize your experience</li>
          <li>Send important updates or marketing emails (if subscribed)</li>
        </ul>
      </section>

      <section>
        <h3>4. Data Security</h3>
        <p>
          We implement reasonable security measures to protect your data.
          However, no online service is 100% secure.
        </p>
      </section>

      <section>
        <h3>5. Your Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal
          information. Contact us if you want to exercise these rights.
        </p>
      </section>

      <section>
        <h3>6. Changes to this Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. The latest
          version will always be posted here.
        </p>
      </section>

      <section>
        <h3>7. Contact Us</h3>
        <p>
          If you have questions, reach out at{' '}
          <a href='mailto:hello@goodurbanite.com'>hello@goodurbanite.com</a>.
        </p>
      </section>
    </div>
  )
}

export default Privacy

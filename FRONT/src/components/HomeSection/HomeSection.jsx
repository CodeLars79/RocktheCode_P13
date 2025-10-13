import './HomeSection.css'
import Button from '../../components/Button/Button'

const HomeSection = ({ title, subtitle, buttonText = 'Get Started' }) => {
  return (
    <section className='home-section'>
      <div className='content'>
        <h1>{title}</h1>
        <p>{subtitle}</p>

        <Button
          text={buttonText}
          size='large'
          variant='primary'
          icon={<img src='/assets/arrow.svg' alt='arrow' />}
          to='/posters'
        />
      </div>
    </section>
  )
}

export default HomeSection

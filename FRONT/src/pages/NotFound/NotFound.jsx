import './NotFound.css'
import Button from '../../components/Button/Button'

const NotFound = () => {
  return (
    <section className='not-found'>
      <h2>404 😕</h2>
      <p>Ooops! We can't find that page...</p>
      <Button
        text='Back to start'
        size='large'
        variant='primary'
        icon={<img src='/assets/arrow.svg' alt='arrow' />}
        to='/'
      />
    </section>
  )
}

export default NotFound

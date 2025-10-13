import './Success.css'
import Button from '../../components/Button/Button'

const Success = () => {
  return (
    <section className='success'>
      <h2>Payment successful!</h2>
      <p>Thank you for your purchase.</p>
      <p>You can now download your poster from your collection.</p>
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

export default Success

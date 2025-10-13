import './Cancel.css'
import Button from '../../components/Button/Button'

const Cancel = () => {
  return (
    <section className='cancel'>
      <h2>Payment cancelled</h2>
      <p>No worries — your poster wasn't charged.</p>
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

export default Cancel

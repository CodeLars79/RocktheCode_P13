import './Home.css'
import Slider from '../../components/Slider/Slider'
import HomeSection from '../../components/HomeSection/HomeSection'
import NewPostersSlider from '../../components/NewPosters/NewPosters'
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid'
import ReviewSection from '../../components/ReviewSection/ReviewSection'

const Home = () => {
  const photos = [
    { url: '/assets/inspi01.jpg', size: 'large' },
    { url: '/assets/inspi02.jpg', size: 'large' },
    { url: '/assets/inspi03.jpg', size: 'small' },
    { url: '/assets/inspi04.jpg', size: 'small' },
    { url: '/assets/inspi05.jpg', size: 'small' },
    { url: '/assets/inspi06.jpg', size: 'large' }
  ]

  return (
    <>
      <Slider />
      <HomeSection
        title='Download. Print. Enjoy.'
        subtitle='Urban art made simple.'
        buttonText='Explore Posters'
      />
      <NewPostersSlider />
      <HomeSection
        title='Inspiration for your walls'
        subtitle='Loads of possibilities, all in one place.'
        buttonText='Get Inspired'
      />
      <PhotoGrid photos={photos} />
      <ReviewSection />
    </>
  )
}

export default Home

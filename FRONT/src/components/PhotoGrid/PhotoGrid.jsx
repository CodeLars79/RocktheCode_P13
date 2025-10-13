import { useState } from 'react'
import Modal from '../../components/Modal/Modal'
import './PhotoGrid.css'

const PhotoGrid = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const openModal = (url) => setSelectedImage(url)
  const closeModal = () => setSelectedImage(null)

  return (
    <>
      <section className='photo-grid-container'>
        <div className='photo-grid'>
          {photos.map((photo, index) => (
            <div
              className='grid-item'
              key={index}
              onClick={() => openModal(photo.url)}
            >
              <img src={photo.url} alt={photo.alt || `photo-${index}`} />
            </div>
          ))}
        </div>
      </section>

      <Modal
        isOpen={!!selectedImage}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  )
}

export default PhotoGrid

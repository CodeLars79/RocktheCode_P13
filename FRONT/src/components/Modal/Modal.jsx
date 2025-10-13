import './Modal.css'

const Modal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <img src={image} alt='Enlarged' className='modal-image' />
      </div>
      <button className='modal-close' onClick={onClose}>
        ✕
      </button>
    </div>
  )
}

export default Modal

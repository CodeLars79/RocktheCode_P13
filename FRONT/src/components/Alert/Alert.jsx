import './Alert.css'

const Alert = ({
  message,
  onClose,
  onConfirm = () => onClose(),
  showCancel = false
}) => {
  if (!message) return null

  return (
    <div className='custom-alert-overlay'>
      <div className='custom-alert-box'>
        <p className='custom-alert-message'>{message}</p>
        <div className='custom-alert-buttons'>
          {showCancel && (
            <button
              className='custom-alert-btn custom-alert-cancel'
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
          )}
          <button
            className='custom-alert-btn custom-alert-confirm'
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert

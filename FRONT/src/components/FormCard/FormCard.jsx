import '../../pages/AdminDashboard/AdminDashboard.css'

const FormCard = ({ title, children }) => (
  <div className='dashboard-card'>
    <h3>{title}</h3>
    {children}
  </div>
)

export default FormCard

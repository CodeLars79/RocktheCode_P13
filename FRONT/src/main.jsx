import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './utils/authContext.jsx'
import CustomCursor from './components/CustomCursor/CustomCursor.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CustomCursor />
      <App />
    </AuthProvider>
  </BrowserRouter>
)

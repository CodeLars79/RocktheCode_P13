import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './hooks/ScrollToTop'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Posters from './pages/Posters/Posters'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Admin from './pages/Admin/Admin'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'
import Cookies from './pages/Cookies/Cookies'
import Privacy from './pages/Privacy/Privacy'
import Terms from './pages/Terms/Terms'
import Success from './pages/Success/Success'
import Cancel from './pages/Cancel/Cancel'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='posters' element={<Posters />} />
          <Route path='register' element={<Register />} />
          <Route path='admin' element={<Admin />} />
          <Route path='admin-dashboard' element={<AdminDashboard />} />
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
          <Route path='cookies' element={<Cookies />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='terms' element={<Terms />} />
          <Route path='cancel' element={<Cancel />} />
          <Route path='success' element={<Success />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

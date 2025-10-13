require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const { connectDB } = require('./src/config/db')

// Routers
const posterRouter = require('./src/api/routes/poster')
const userRouter = require('./src/api/routes/user')
const favoriteRouter = require('./src/api/routes/favorite')
const stripeRouter = require('./src/api/routes/stripe')
const reviewRoutes = require('./src/api/routes/review')
const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// Connect to DB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posters', posterRouter)
app.use('/api/v1/favorites', favoriteRouter)
app.use('/api/v1/stripe', stripeRouter)
app.use('/api/v1/reviews', reviewRoutes)

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({ message: 'Route not found' })
})

// Server
app.listen(3000, () => {
  console.log('The server is working at: http://localhost:3000 🚀')
})

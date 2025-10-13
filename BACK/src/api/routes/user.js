const { isAuth, isAdmin } = require('../../middleware/isAuth')

const {
  getUsers,
  getUserById,
  register,
  updateUser,
  login,
  adminLogin,
  getMe,
  deleteUser
} = require('../controllers/user')

const userRouter = require('express').Router()

// Auth
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/admin', adminLogin)

// User info
userRouter.get('/me', isAuth, getMe)

// User CRUD
userRouter.get('/', isAuth, isAdmin, getUsers) // Get all users (only admin)
userRouter.get('/:id', getUserById) // Get single user by ID
userRouter.put('/:id', isAuth, updateUser) // Update user (self only)
userRouter.delete('/:id', isAuth, deleteUser) // Delete user (self only)

module.exports = userRouter

const { generateKey } = require('../../utils/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// CREATE - Register
const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
      })
    }

    const userDuplicated = await User.findOne({ email })
    if (userDuplicated) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = new User({
      userName,
      email,
      password,
      role: 'USER'
    })

    const user = await newUser.save()
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or password' })
    }

    const token = generateKey(user._id)
    user.password = undefined

    return res.status(200).json({ token, user })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}

// ADMIN LOGIN
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or password' })
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied: Admins only' })
    }

    const token = generateKey(user._id)
    user.password = undefined

    return res.status(200).json({ token, user })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}

// READ all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    if (!users.length) {
      return res.status(404).json({ message: 'No users found' })
    }
    return res.status(200).json(users)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching users', error: error.message })
  }
}

// READ one user
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const requester = req.user

    if (requester._id.toString() !== id && requester.role !== 'ADMIN') {
      return res
        .status(403)
        .json({ message: 'Not authorized to view this user' })
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message })
  }
}

// GET logged-in user
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message })
  }
}

// UPDATE user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.user._id.toString() !== id && req.user.role !== 'ADMIN') {
      return res
        .status(403)
        .json({ message: 'You are not allowed to update this user' })
    }

    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!userUpdated) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(userUpdated)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error updating user', error: error.message })
  }
}

// DELETE user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id.toString()

    if (id !== userId && req.user.role !== 'ADMIN') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this account' })
    }

    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User deleted successfully', deletedUser })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error deleting user', error: error.message })
  }
}

module.exports = {
  getUsers,
  getUserById,
  getMe,
  register,
  updateUser,
  login,
  adminLogin,
  deleteUser
}

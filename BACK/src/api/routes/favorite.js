const { isAuth } = require('../../middleware/isAuth')

const {
  addFavorite,
  getFavoritesByUser,
  removeFavorite
} = require('../controllers/favorite')

const favoriteRouter = require('express').Router()

// Favorites
favoriteRouter.post('/', isAuth, addFavorite) // Add to favorites
favoriteRouter.get('/', isAuth, getFavoritesByUser) // Get all favorites for logged-in user
favoriteRouter.delete('/:posterId', isAuth, removeFavorite) // Remove from favorites

module.exports = favoriteRouter

const Favorite = require('../models/favorite')
const Poster = require('../models/poster')

// ADD poster to favorites
const addFavorite = async (req, res, next) => {
  try {
    const { posterId } = req.body

    if (!posterId) {
      return res.status(400).json({ message: 'Poster ID is required' })
    }

    const poster = await Poster.findById(posterId)
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' })
    }

    // Try to create a new favorite
    const newFavorite = new Favorite({
      user: req.user._id,
      poster: posterId
    })

    await newFavorite.save()

    return res.status(200).json({
      message: 'Poster added to favorites',
      favorite: newFavorite
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Poster already in favorites' })
    }
    return res
      .status(500)
      .json({ message: 'Error adding favorite', error: error.message })
  }
}

// GET all favorites for logged-in user
const getFavoritesByUser = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate(
      'poster'
    )

    return res.status(200).json(favorites)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching favorites', error: error.message })
  }
}

// REMOVE poster from favorites
const removeFavorite = async (req, res, next) => {
  try {
    const { posterId } = req.params

    const deletedFavorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      poster: posterId
    })

    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' })
    }

    return res.status(200).json({ message: 'Poster removed from favorites' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error removing favorite', error: error.message })
  }
}

module.exports = {
  addFavorite,
  getFavoritesByUser,
  removeFavorite
}

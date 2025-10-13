const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poster',
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'favorites'
  }
)

favoriteSchema.index({ user: 1, poster: 1 }, { unique: true })

const Favorite = mongoose.model('Favorite', favoriteSchema, 'favorites')
module.exports = Favorite

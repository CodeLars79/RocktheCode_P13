const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 }
  },
  { timestamps: true }
)

const Review = mongoose.model('Review', reviewSchema, 'reviews')

module.exports = Review

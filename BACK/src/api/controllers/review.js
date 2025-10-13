const Review = require('../models/review')

// CREATE (admin only)
const postReview = async (req, res, next) => {
  try {
    const review = new Review(req.body)
    const saved = await review.save()
    res.status(201).json(saved)
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error creating review', error: err.message })
  }
}

// READ
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.status(200).json(reviews)
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error fetching reviews', error: err.message })
  }
}

// DELETE (admin only)
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted = await Review.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Review not found' })
    res.status(200).json({ message: 'Review deleted successfully' })
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error deleting review', error: err.message })
  }
}

module.exports = { postReview, getReviews, deleteReview }

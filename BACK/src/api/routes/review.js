const express = require('express')
const router = express.Router()
const { isAuth, isAdmin } = require('../../middleware/isAuth')
const {
  postReview,
  getReviews,
  deleteReview
} = require('../controllers/review')

router.get('/', getReviews) // Get all reviews

router.post('/', isAuth, isAdmin, postReview) // Create review (admin only)
router.delete('/:id', isAuth, isAdmin, deleteReview) // Delete review (admin only)

module.exports = router

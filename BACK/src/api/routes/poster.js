const { isAuth, isAdmin } = require('../../middleware/isAuth')
const upload = require('../../middleware/file')
const {
  getPosters,
  postPoster,
  updatePoster,
  deletePoster,
  downloadPoster
} = require('../controllers/poster')

const posterRouter = require('express').Router()

// Posters CRUD
posterRouter.get('/', getPosters)
posterRouter.post('/', isAuth, isAdmin, upload.single('image'), postPoster) // Admin-only
posterRouter.put('/:id', isAuth, isAdmin, updatePoster)
posterRouter.delete('/:id', isAuth, isAdmin, deletePoster)

// Poster download (free only)
posterRouter.get('/:id/download', isAuth, downloadPoster)

module.exports = posterRouter

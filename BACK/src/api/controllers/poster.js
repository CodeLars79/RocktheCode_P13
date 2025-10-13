const Poster = require('../models/poster')

const parseArray = (value) => {
  try {
    if (!value) return []
    return Array.isArray(value) ? value : JSON.parse(value)
  } catch {
    return []
  }
}

// CREATE POSTER
const postPoster = async (req, res, next) => {
  try {
    if (!req.body.title || !req.file?.path) {
      return res.status(400).json({ message: 'Title and image are required' })
    }

    const validPrices = [10, 20, 30]
    const price =
      req.body.price !== undefined ? Number(req.body.price) : undefined
    if (price && !validPrices.includes(price)) {
      return res
        .status(400)
        .json({ message: 'Price must be either 10, 20, or 30' })
    }

    const newPoster = new Poster({
      title: req.body.title,
      year: req.body.year || null,
      color: parseArray(req.body.color),
      format: parseArray(req.body.format),
      orientation: parseArray(req.body.orientation),
      style: parseArray(req.body.style),
      dimensions: parseArray(req.body.dimensions).map(Number),
      price: price ?? 0,
      isFree:
        req.body.isFree === 'true' || req.body.isFree === true ? true : false,
      image: req.file.path
    })

    const savedPoster = await newPoster.save()
    return res.status(201).json(savedPoster)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// READ - all posters
const getPosters = async (req, res, next) => {
  try {
    const allPosters = await Poster.find()
    return res.status(200).json(allPosters)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Bad Request', error: error.message })
  }
}

// UPDATE POSTER
const updatePoster = async (req, res) => {
  try {
    const { id } = req.params
    const existingPoster = await Poster.findById(id)
    if (!existingPoster) {
      return res.status(404).json({ message: 'Poster not found' })
    }

    const validPrices = [10, 20, 30]

    let newPrice = existingPoster.price
    if (req.body.price !== undefined && req.body.price !== '') {
      const numericPrice = Number(req.body.price)
      if (!validPrices.includes(numericPrice)) {
        return res
          .status(400)
          .json({ message: 'Price must be either 10, 20, or 30' })
      }
      newPrice = numericPrice
    }

    const updatedData = {
      title: req.body.title ?? existingPoster.title,
      year: req.body.year ?? existingPoster.year,
      color: req.body.color ? parseArray(req.body.color) : existingPoster.color,
      format: req.body.format
        ? parseArray(req.body.format)
        : existingPoster.format,
      orientation: req.body.orientation
        ? parseArray(req.body.orientation)
        : existingPoster.orientation,
      style: req.body.style ? parseArray(req.body.style) : existingPoster.style,
      dimensions: req.body.dimensions
        ? parseArray(req.body.dimensions).map(Number)
        : existingPoster.dimensions,
      price: newPrice,
      isFree:
        req.body.isFree !== undefined
          ? req.body.isFree === 'true' || req.body.isFree === true
          : existingPoster.isFree,
      image: req.file?.path || existingPoster.image
    }

    const updatedPoster = await Poster.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    })

    return res.status(200).json(updatedPoster)
  } catch (error) {
    console.error('Error in updatePoster:', error)
    return res.status(400).json({ message: error.message })
  }
}

// DOWNLOAD (free posters only)
const downloadPoster = async (req, res, next) => {
  try {
    const { id } = req.params
    const poster = await Poster.findById(id)
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' })
    }

    if (poster.isFree || poster.price === 0) {
      return res.status(200).json({ downloadUrl: poster.image })
    }

    return res.status(403).json({
      message: 'Poster is not free. Please purchase via Stripe checkout.'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error downloading poster',
      error: error.message
    })
  }
}

// DELETE POSTER
const deletePoster = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedPoster = await Poster.findByIdAndDelete(id)

    if (!deletedPoster) {
      return res.status(404).json({ message: 'Poster not found' })
    }

    return res.status(200).json({
      message: 'Poster deleted successfully',
      deletedPoster
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Bad Request', error: error.message })
  }
}

module.exports = {
  getPosters,
  postPoster,
  updatePoster,
  deletePoster,
  downloadPoster
}

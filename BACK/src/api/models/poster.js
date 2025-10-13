const mongoose = require('mongoose')

const posterSchema = new mongoose.Schema(
  {
    id: { type: String, required: false },
    title: { type: String, required: false },
    year: { type: Number, required: false },
    color: [{ type: String, required: false }],
    format: [{ type: String, required: false }],
    orientation: [{ type: String, required: false }],
    style: [{ type: String, required: false }],
    dimensions: [{ type: Number, required: false }],
    price: { type: Number, required: false },
    isFree: { type: Boolean, default: false },
    image: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'posters'
  }
)

const Poster = mongoose.model('Poster', posterSchema, 'posters')
module.exports = Poster

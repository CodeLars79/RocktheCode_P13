require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
const Review = require('../api/models/review')

if (!process.env.DB_URL) {
  console.error('❌ DB_URL not found! Please check your .env file.')
  process.exit(1)
}

const csvFilePath = path.join(__dirname, '../utils/reviews.csv')
console.log('Looking for CSV at:', csvFilePath)

async function seedDB() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('✅ DB connected')

    const reviews = []

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          let rating = Number(row.Rating)
          if (isNaN(rating) || rating < 1 || rating > 5) {
            rating = 5
          }

          const reviewData = {
            name: row.Name,
            text: row.Text,
            rating
          }
          reviews.push(reviewData)
        })
        .on('end', () => {
          console.log(`📄 Finished reading CSV. Total rows: ${reviews.length}`)
          resolve()
        })
        .on('error', (err) => {
          console.error('❌ Error reading CSV:', err)
          reject(err)
        })
    })

    await Review.deleteMany({})
    const inserted = await Review.insertMany(reviews)
    console.log(`🌱 Seeded ${inserted.length} reviews successfully`)
  } catch (error) {
    console.error('❌ Error seeding reviews:', error)
  } finally {
    await mongoose.connection.close()
    console.log('DB connection closed')
  }
}

seedDB()

require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
const Poster = require('../api/models/poster')

if (!process.env.DB_URL) {
  console.error('❌ DB_URL not found! Please check your .env file.')
  process.exit(1)
}

const csvFilePath = path.join(__dirname, '../utils/posters.csv')
console.log('Looking for CSV at:', csvFilePath)

async function seedDB() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('✅ DB connected')

    const posters = []

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          let priceValue = 0
          let isFreeValue = false

          if (row.Price) {
            if (row.Price.trim().toLowerCase() === 'free') {
              priceValue = 0
              isFreeValue = true
            } else if (!isNaN(Number(row.Price))) {
              priceValue = Number(row.Price)
              isFreeValue = priceValue === 0
            }
          }

          const posterData = {
            id: row.ID,
            title: row.Title,
            year:
              row.Year && !isNaN(Number(row.Year))
                ? Number(row.Year)
                : undefined,
            color: row.Color ? row.Color.split(',').map((c) => c.trim()) : [],
            format: row.Format
              ? row.Format.split(',').map((f) => f.trim())
              : [],
            orientation: row.Orientation
              ? row.Orientation.split(',').map((o) => o.trim())
              : [],
            style: row.Style ? row.Style.split(',').map((s) => s.trim()) : [],
            dimensions: row.Dimensions
              ? row.Dimensions.replace(/[^\d,x]/g, '')
                  .split('x')
                  .map((d) => Number(d.trim()))
                  .filter((n) => !isNaN(n))
              : [],
            price: priceValue,
            isFree: isFreeValue,
            image: row.Image
          }

          posters.push(posterData)
        })
        .on('end', () => {
          console.log(`📄 Finished reading CSV. Total rows: ${posters.length}`)
          resolve()
        })
        .on('error', (err) => {
          console.error('❌ Error reading CSV:', err)
          reject(err)
        })
    })

    await Poster.deleteMany({})
    const inserted = await Poster.insertMany(posters)
    console.log(`🌱 Seeded ${inserted.length} posters successfully`)
  } catch (error) {
    console.error('❌ Error seeding posters:', error)
  } finally {
    await mongoose.connection.close()
    console.log('DB connection closed')
  }
}

seedDB()

require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
const User = require('../api/models/user')

if (!process.env.DB_URL) {
  console.error('❌ DB_URL not found! Please check your .env file.')
  process.exit(1)
}

const csvFilePath = path.join(__dirname, '../utils/users.csv')
console.log('Looking for CSV at:', csvFilePath)

function generatePassword(length = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

async function seedUsers() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('✅ DB connected')

    const users = []

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath, { encoding: 'utf8' })
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          if (row.ID && row.Name && row.Email) {
            users.push({
              userName: row.Name,
              email: row.Email,
              password: generatePassword(),
              role: 'USER'
            })
          }
        })
        .on('end', () => {
          console.log(`📄 Finished reading CSV. Total rows: ${users.length}`)
          resolve()
        })
        .on('error', (err) => {
          console.error('❌ Error reading CSV:', err)
          reject(err)
        })
    })

    await User.deleteMany({})
    const inserted = await User.insertMany(users)
    console.log(`🌱 Seeded ${inserted.length} users successfully`)
  } catch (error) {
    console.error('❌ Error seeding users:', error)
  } finally {
    await mongoose.connection.close()
    console.log('DB connection closed')
  }
}

seedUsers()

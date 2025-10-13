const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('DB was connected successfully 🚀')
  } catch (error) {
    console.log('DB exploded!💥')
  }
}

module.exports = { connectDB }

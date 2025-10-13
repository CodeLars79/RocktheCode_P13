const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },

    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posters'
      }
    ],

    purchased: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posters'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10)
  }
})

const User = mongoose.model('User', userSchema, 'users')
module.exports = User

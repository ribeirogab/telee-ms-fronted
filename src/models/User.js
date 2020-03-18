const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  permission: {
    type: Number,
    required: true
  }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

module.exports = model('User', UserSchema)

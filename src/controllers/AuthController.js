require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env'
})
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
  async authenticate (req, res) {
    try {
      const { username, password } = req.body

      const user = await User.findOne({ username }).select('+password')

      if (!user) {
        throw new Error('Usuário ou senha incorreto(s)!')
      }

      if (!await bcrypt.compare(password, user.password)) {
        throw new Error('Usuário ou senha incorreto(s)!')
      }

      user.password = undefined

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400
      })

      return res.json({ user, token })
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  }
}

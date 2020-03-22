const User = require('../models/User')

module.exports = {
  async index (req, res) {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listing users!' })
    }
  },

  async show (req, res) {
    try {
      const userId = req.params.userId === 'I' ? req.userId : req.params.userId
      const user = await User.findById(userId)

      user.createdAt = undefined
      user.updatedAt = undefined
      user.__v = undefined

      return res.json(user)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async store (req, res) {
    try {
      const { username, name, password, permission } = req.body

      const userExists = await User.findOne({ username })

      if (userExists) {
        return res.json(userExists)
      }

      const user = await User.create({
        username, name, password, permission
      })
      return res.json(user)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new user!' })
    }
  },

  async update (req, res) {
    try {
      const { userId } = req.params
      const { ...fileds } = req.body
      const user = await User.findByIdAndUpdate(userId, fileds, { new: true })
      return res.json(user)
    } catch (error) {
      return res.status(400).send({ error: 'Error updating user' })
    }
  },

  async destroy (req, res) {
    try {
      const { userId } = req.params
      await User.findByIdAndDelete(userId)
      return res.json({ message: 'User deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error: 'Error deleting user' })
    }
  }
}

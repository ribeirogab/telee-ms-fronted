const User = require('../models/User')

module.exports = {
  async index (req, res) {
    try {
      const { type } = req.params
      const permission = type === 'writer' ? { $lt: 4 } : type === 'editor' ? { $gt: 3 } : { $gt: 0 }
      const writers = await User.find({ permission })
      return res.json(writers)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error list writer!' })
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
      const { type } = req.params
      const { username, name, password } = req.body
      let { permission } = req.body

      const currentUser = await User.findById(req.userId)

      const userExists = await User.findOne({ username })
      if (userExists) return res.json(userExists)

      if (type === 'writer') {
        if (permission > 3 || permission < 1) permission = 1
        if (!currentUser.permission > 3) throw new Error('You are not allowed to do this!')
      } else if (type === 'editor') {
        if (permission < 4 || permission > 6) permission = 4
        if (!currentUser.permission === 99) throw new Error('You are not allowed to do this!')
      }

      const user = await User.create({
        username, name, password, permission
      })

      user.password = undefined
      return res.json(user)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new user!' })
    }
  },

  async update (req, res) {
    try {
      const userId = req.params.userId === 'I' ? req.userId : req.params.userId
      const { type } = req.params

      const userExists = await User.findById(userId)

      if (!userExists) throw new Error('User does not exist!')

      const currentUser = await User.findById(req.userId)

      if (type === 'writer') {
        if (currentUser.permission < 4 && currentUser._id !== userExists._id) {
          throw new Error('You are not allowed to do this!')
        }
      } else if (type === 'editor') {
        if (currentUser.permission !== 99 && currentUser._id !== userExists._id) {
          throw new Error('You are not allowed to do this!')
        }
      }

      const { username, name, permission } = req.body
      const user = await User.findByIdAndUpdate(userId, { username, name, permission }, { new: true })

      return res.json(user)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async destroy (req, res) {
    try {
      const currentUser = await User.findById(req.userId)
      if (currentUser.permission < 4) throw new Error('Only editors and developers can use this route!')

      const { userId } = req.params

      const userExists = await User.findById(userId)

      if (!userExists) throw new Error('User does not exist!')
      else if (userExists.permission === 99) throw new Error('Developers cannot be excluded!')
      else if (userExists._id === currentUser._id) throw new Error('You cannot self-destruct')
      else if (userExists.permission > 3 && currentUser.permission !== 99) throw new Error('Only developers can exclude editors')

      await User.findByIdAndDelete(userId)
      return res.json({ message: 'User deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  }

}

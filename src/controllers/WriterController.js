const User = require('../models/User')

module.exports = {
  async index (req, res) {
    try {
      const writers = await User.find({
        permission: { $lt: 3 }
      })
      return res.json(writers)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error list writer!' })
    }
  },

  async show (req, res) {
    try {
      const writerId = req.params.writerId === 'I' ? req.userId : req.params.writerId
      const writer = await User.findById(writerId)
      if (!writer) throw new Error('User does not exist!')
      if (writer.permission > 2) throw new Error('You are not a writer!')

      writer.createdAt = undefined
      writer.updatedAt = undefined
      writer.__v = undefined

      return res.json(writer)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async store (req, res) {
    try {
      const { username, name, password } = req.body
      let { permission } = req.body

      const userExists = await User.findOne({ username })
      if (userExists) return res.json(userExists)

      if (permission > 2) permission = 0
      const writer = await User.create({
        username, name, password, permission
      })

      return res.json(writer)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new writer!' })
    }
  },

  async update (req, res) {
    try {
      const writerId = req.params.writerId === 'I' ? req.userId : req.params.writerId

      const isWriter = await User.findById(writerId)
      if (!isWriter) throw new Error('User does not exist!')
      if (isWriter.permission > 2) throw new Error('You are not a writer!')

      const { name } = req.body
      const writer = await User.findByIdAndUpdate(writerId, { name }, { new: true })

      return res.json(writer)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async destroy (req, res) {
    try {
      const havePermission = await User.findById(req.userId)
      if (havePermission.permission < 3) throw new Error('Only editors and developers can use this route!')

      const { writerId } = req.params

      const isDeveloper = await User.findById(writerId)
      if (!isDeveloper) throw new Error('User does not exist!')
      if (isDeveloper.permission === 99) throw new Error('Developers cannot be excluded!')

      await User.findByIdAndDelete(writerId)
      return res.json({ message: 'User deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  }
}

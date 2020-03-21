const User = require('../models/User')

module.exports = {
  async index (req, res) {
    try {
      const editors = await User.find({
        permission: { $gt: 2 }
      })
      return res.json(editors)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error list editor!' })
    }
  },

  async show (req, res) {
    try {
      const editorId = req.params.editorId === 'I' ? req.userId : req.params.editorId
      const editor = await User.findById(editorId)
      if (!editor) throw new Error('User does not exist!')
      if (editor.permission < 3) throw new Error('You are not a editor+!')

      editor.createdAt = undefined
      editor.updatedAt = undefined
      editor.__v = undefined
      return res.json(editor)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error list editor!' })
    }
  },

  async store (req, res) {
    try {
      const { username, name, password } = req.body
      let { permission } = req.body

      const userExists = await User.findOne({ username })
      if (userExists) return res.json(userExists)

      if (permission < 3 || permission > 5) permission = 3
      const editor = await User.create({
        username, name, password, permission
      })

      return res.json(editor)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new editor!' })
    }
  },

  async update (req, res) {
    try {
      const editorId = req.params.editorId === 'I' ? req.userId : req.params.editorId
      const isEditor = await User.findById(editorId)
      if (!isEditor) throw new Error('User does not exist!')
      if (isEditor.permission < 3) throw new Error('You are not a editor+!')

      const { name } = req.body
      const editor = await User.findByIdAndUpdate(editorId, { name }, { new: true })

      return res.json(editor)
    } catch (error) {
      return res.status(400).send({ error: 'Error updating editor' })
    }
  },

  async destroy (req, res) {
    try {
      const havePermission = await User.findById(req.userId)
      if (havePermission.permission !== 99) throw new Error('Only developers can use this route!')

      const { editorId } = req.params

      const isDeveloper = await User.findById(editorId)
      if (!isDeveloper) throw new Error('User does not exist!')
      if (isDeveloper.permission === 99) throw new Error('Developers cannot be excluded!')

      await User.findByIdAndDelete(editorId)
      return res.json({ message: 'User deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  }
}

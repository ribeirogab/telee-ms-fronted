const Task = require('../models/Task')
const User = require('../models/User')

module.exports = {
  async index (req, res) {
    try {
      const { state } = req.params
      const status = state === 'uninitiated' ? { $eq: 0 } : state === 'audit' ? { $gt: 1 } : { $gt: -1 }
      const tasks = await Task.find({ status })
      return res.json(tasks)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error list tasks!' })
    }
  },

  async show (req, res) {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)
      if (!task) throw new Error('Task does not exist!')
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async store (req, res) {
    try {
      const currentUser = await User.findById(req.userId)
      if (currentUser < 4) throw new Error('Only editors and developers can use this route!')

      const { type, keyword, subKeywords, website, guidelines, description } = req.body

      const task = await Task.create({
        type,
        keyword,
        subKeywords,
        website,
        guidelines,
        description,
        status: 0,
        comments: [],
        content: {}
      })

      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new task!' })
    }
  },

  async update (req, res) {
    try {
      const { taskId } = req.params
      const currentUser = await User.findById(req.userId)
      const currentTask = await Task.findById(taskId)

      if (!currentTask) throw new Error('Task does not exist!')
      else if (currentUser.permission < 4 && currentTask.writer !== currentUser._id) throw new Error('Writers can only edit their own tasks!')

      const { ...updatedTask } = req.body
      const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async destroy (req, res) {
    try {
      const currentUser = await User.findById(req.userId)
      if (currentUser < 4) throw new Error('Only editors and developers can use this route!')

      const { taskId } = req.params

      const currentTask = await Task.findById(taskId)

      if (!currentTask) throw new Error('Task does not exist!')
      if (currentTask.status > 0) throw new Error('Tasks started cannot be deleted!')

      await Task.findByIdAndDelete(taskId)
      return res.json({ message: 'Task deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  }
}

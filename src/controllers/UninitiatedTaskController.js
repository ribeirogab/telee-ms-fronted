const Task = require('../models/Task')

module.exports = {
  async index (req, res) {
    try {
      const uninitiatedTasks = await Task.find({
        status: { $eq: 0 }
      })

      return res.json(uninitiatedTasks)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error listed uninitiated task!' })
    }
  },

  async show (req, res) {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)
      if (!task) throw new Error('Task does not exist!')
      if (task.status > 0) throw new Error('This task has already started')
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async store (req, res) {
    try {
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

      const taskStarted = await Task.findById(taskId)
      if (!taskStarted) throw new Error('Task does not exist!')
      if (taskStarted.status > 0) throw new Error('Tasks started cannot be edited!')

      const { ...updatedTask } = req.body
      const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async destroy (req, res) {
    try {
      const { taskId } = req.params

      const taskStarted = await Task.findById(taskId)
      if (!taskStarted) throw new Error('Task does not exist!')
      if (taskStarted.status > 0) throw new Error('Tasks started cannot be deleted!')

      await Task.findByIdAndDelete(taskId)
      return res.json({ message: 'Task deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  }
}

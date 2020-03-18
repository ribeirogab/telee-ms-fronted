const Task = require('../models/Task')

const countWords = require('../utils/countWords')

module.exports = {
  async index (req, res) {
    try {
      const tasks = await Task.find({
        status: { $eq: 0 }
      })
      return res.json(tasks)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed task!' })
    }
  },

  async show (req, res) {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed task!' })
    }
  },

  async store (req, res) {
    try {
      const { type, keyword, subKeywords, guidelines, website, content } = req.body

      const [words, value] = countWords(content)

      const task = await Task.create({
        type,
        keyword,
        subKeywords,
        guidelines,
        website,
        status: 0,
        comments: [],
        content,
        words,
        value
      })

      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new task!' })
    }
  },

  async update (req, res) {
    try {
      const { taskId } = req.params
      const { updatedTask } = req.body
      const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error updating task!' })
    }
  },

  async destroy (req, res) {
    try {
      const { taskId } = req.params
      await Task.findByIdAndDelete(taskId)
      return res.json({ message: 'Task deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error deleting task!' })
    }
  }
}

const Task = require('../models/Task')
const User = require('../models/User')

module.exports = {
  async index (req, res) {
    try {
      const tasks = await Task.find({
        writer: { $eq: req.userId }
      })
      return res.json(tasks)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed task!' })
    }
  },

  async update (req, res) {
    try {
      const { taskId } = req.params
      const currentUser = await User.findById(req.userId)
      if (currentUser.permission > 3) throw new Error('Only writers can take on tasks')

      const currentTask = await Task.findById(taskId)
      if (!currentTask) throw new Error('Task not found!')
      if (currentTask.status !== 0) throw new Error('Only uninitiated tasks can be taken on!')

      const task = await Task.findByIdAndUpdate(taskId, { status: 0, writer: req.userId }, { new: true })

      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error updating task!' })
    }
  }
}

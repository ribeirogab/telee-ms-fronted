const Task = require('../models/Task')

module.exports = {
  async index (req, res) {
    try {
      const { writerId } = req.params
      const tasks = await Task.find({
        writer: { $eq: writerId }
      })
      return res.json(tasks)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed task!' })
    }
  },

  async update (req, res) {
    try {
      const { taskid, writerid } = req.headers
      const task = await Task.findByIdAndUpdate(taskid, { writer: writerid, status: 1 }, { new: true })
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error updating task!' })
    }
  },

  async sendForAudit (req, res) {
    try {
      const { taskid, writerid } = req.headers
      const filter = { _id: taskid, writer: writerid }
      const task = await Task.findOneAndUpdate(filter, { status: 2 }, { new: true })
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error updating task!' })
    }
  }
}

const Task = require('../models/Task')

module.exports = {
  async index (req, res) {
    try {
      const tasks = await Task.find({
        status: { $gt: 1 }
      })
      return res.json(tasks)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  },

  async update (req, res) {
    try {
      const { taskid } = req.headers
      const { status } = req.body
      const filter = {
        _id: taskid,
        $and: [
          { status: { $gt: 1 } },
          { status: { $lt: 4 } }
        ]
      }
      const task = await Task.findOneAndUpdate(filter, { status }, { new: true })
      if (!task) throw new Error('Erro ao atualizar status da tarefa!')
      return res.json(task)
    } catch (error) {
      return res.status(400).send({ error, message: error.message })
    }
  }
}

const { Router } = require('express')
// const authMiddleware = require('../middlewares/auth')
const TaskController = require('../../controllers/TaskController')

const taskRoutes = Router()
// taskRoutes.use(authMiddleware)

taskRoutes.get('/task', TaskController.index)
taskRoutes.get('/task/:taskId', TaskController.show)
taskRoutes.post('/task', TaskController.store)
taskRoutes.put('/task/:taskId', TaskController.update)
taskRoutes.delete('/task/:taskId', TaskController.destroy)

module.exports = taskRoutes

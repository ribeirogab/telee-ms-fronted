const { Router } = require('express')
const authMiddleware = require('../../middlewares/auth')
const UninitiatedTaskController = require('../../controllers/UninitiatedTaskController')

const uninitiatedTaskRoutes = Router().use(authMiddleware)

uninitiatedTaskRoutes.get('/uninitiated-task', UninitiatedTaskController.index)
uninitiatedTaskRoutes.get('/uninitiated-task/:taskId', UninitiatedTaskController.show)
uninitiatedTaskRoutes.post('/uninitiated-task', UninitiatedTaskController.store)
uninitiatedTaskRoutes.put('/uninitiated-task/:taskId', UninitiatedTaskController.update)
uninitiatedTaskRoutes.delete('/uninitiated-task/:taskId', UninitiatedTaskController.destroy)

module.exports = uninitiatedTaskRoutes

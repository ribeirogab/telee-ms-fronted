const { Router } = require('express')
const authMiddleware = require('./middlewares/auth')

const SessionController = require('./controllers/SessionController')
const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const WriterTaskController = require('./controllers/WriterTaskController')

const publicRoutes = Router()
const privateRoutes = Router().use(authMiddleware)

// AUTHENTICATE
publicRoutes.post('/sessions', SessionController.authenticate)

// TASKS
privateRoutes.get('/task/:state', TaskController.index)
privateRoutes.get('/task/u/:taskId', TaskController.show)
privateRoutes.post('/task', TaskController.store)
privateRoutes.put('/task/:taskId', TaskController.update)
privateRoutes.delete('/task/:taskId', TaskController.destroy)

// USERS
publicRoutes.get('/user/:type', UserController.index)
privateRoutes.get('/user/u/:userId', UserController.show)
privateRoutes.post('/user/:type', UserController.store)
privateRoutes.put('/user/u/:type/:userId', UserController.update)
privateRoutes.delete('/user/u/:userId', UserController.destroy)

// WRITERS + TASKS
privateRoutes.get('/writer/task', WriterTaskController.index)
privateRoutes.put('/writer/task/:taskId', WriterTaskController.update)

module.exports = [publicRoutes, privateRoutes]

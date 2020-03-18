const { Router } = require('express')
const routes = Router()

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const WriterTaskController = require('./controllers/WriterTaskController')
const AuditController = require('./controllers/AuditController')
const WebsiteController = require('./controllers/WebsiteController')

routes.get('/user', UserController.index)
routes.get('/user/:userId', UserController.show)
routes.post('/user', UserController.store)
routes.put('/user/:userId', UserController.update)
routes.delete('/user/:userId', UserController.destroy)

routes.get('/task', TaskController.index)
routes.get('/task/:taskId', TaskController.show)
routes.post('/task', TaskController.store)
routes.put('/task/:taskId', TaskController.update)
routes.delete('/task/:taskId', TaskController.destroy)

routes.get('/writer/task/:writerId', WriterTaskController.index)
routes.put('/writer/task', WriterTaskController.update)
routes.put('/writer/task/send/audit', WriterTaskController.sendForAudit)

routes.get('/audit', AuditController.index)
routes.put('/audit', AuditController.update)

routes.get('/website', WebsiteController.index)
routes.get('/website/:websiteId', WebsiteController.show)
routes.post('/website', WebsiteController.store)
routes.put('/website/:websiteId', WebsiteController.update)
routes.delete('/website/:websiteId', WebsiteController.destroy)

module.exports = routes

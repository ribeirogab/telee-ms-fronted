const { Router } = require('express')
const authMiddleware = require('../../middlewares/auth')
const WriterTaskController = require('../../controllers/WriterTaskController')

const writerTaskRoutes = Router()
writerTaskRoutes.use(authMiddleware)

writerTaskRoutes.get('/writer/task/:writerId', WriterTaskController.index)
writerTaskRoutes.put('/writer/task', WriterTaskController.update)
writerTaskRoutes.put('/writer/task/send/audit', WriterTaskController.sendForAudit)

module.exports = writerTaskRoutes

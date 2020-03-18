const { Router } = require('express')
const authMiddleware = require('../../middlewares/auth')
const AuditController = require('../../controllers/AuditController')

const auditRoutes = Router()
auditRoutes.use(authMiddleware)

auditRoutes.get('/audit', AuditController.index)
auditRoutes.put('/audit', AuditController.update)

module.exports = auditRoutes

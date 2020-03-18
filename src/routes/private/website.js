const { Router } = require('express')
const authMiddleware = require('../../middlewares/auth')
const WebsiteController = require('../../controllers/WebsiteController')

const websiteRoutes = Router()
websiteRoutes.use(authMiddleware)

websiteRoutes.get('/website', WebsiteController.index)
websiteRoutes.get('/website/:websiteId', WebsiteController.show)
websiteRoutes.post('/website', WebsiteController.store)
websiteRoutes.put('/website/:websiteId', WebsiteController.update)
websiteRoutes.delete('/website/:websiteId', WebsiteController.destroy)

module.exports = websiteRoutes

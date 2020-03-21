const { Router } = require('express')
const authMiddleware = require('../../middlewares/auth')
const WriterController = require('../../controllers/WriterController')

const writerRoutes = Router().use(authMiddleware)

writerRoutes.get('/writer', WriterController.index)
writerRoutes.get('/writer/u/:writerId', WriterController.show)
writerRoutes.post('/writer', WriterController.store)
writerRoutes.put('/writer/u/:writerId', WriterController.update)
writerRoutes.delete('/writer/u/:writerId', WriterController.destroy)

module.exports = writerRoutes

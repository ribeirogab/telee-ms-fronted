const { Router } = require('express')
const authMiddleware = require('../../middlewares/auth')
const EditorController = require('../../controllers/EditorController')

const editorRoutes = Router().use(authMiddleware)

editorRoutes.get('/editor', EditorController.index)
editorRoutes.get('/editor/u/:editorId', EditorController.show)
editorRoutes.post('/editor', EditorController.store)
editorRoutes.put('/editor/u/:editorId', EditorController.update)
editorRoutes.delete('/editor/u/:editorId', EditorController.destroy)

module.exports = editorRoutes

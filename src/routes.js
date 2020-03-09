const { Router } = require('express')
const routes = Router()

const UserController = require('./controllers/UserController')
const ArticleController = require('./controllers/ArticleController')

routes.get('/user', UserController.index)
routes.get('/user/:userId', UserController.show)
routes.post('/user', UserController.store)
routes.put('/user/:userId', UserController.update)
routes.delete('/user/:userId', UserController.destroy)

routes.get('/article', ArticleController.index)
routes.get('/article/:articleId', ArticleController.show)
routes.post('/article', ArticleController.store)
routes.put('/article/:articleId', ArticleController.update)
routes.delete('/article/:articleId', ArticleController.destroy)

module.exports = routes

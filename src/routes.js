const { Router } = require('express')
const routes = Router()

const UserController = require('./controllers/UserController')
const ArticleController = require('./controllers/ArticleController')
const WebsiteController = require('./controllers/WebsiteController')

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

routes.get('/website', WebsiteController.index)
routes.get('/website/:websiteId', WebsiteController.show)
routes.post('/website', WebsiteController.store)
routes.put('/website/:websiteId', WebsiteController.update)
routes.delete('/website/:websiteId', WebsiteController.destroy)

module.exports = routes

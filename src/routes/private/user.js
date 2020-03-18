const { Router } = require('express')
// const authMiddleware = require('../middlewares/auth')
const UserController = require('../../controllers/UserController')

const userRoutes = Router()
// userRoutes.use(authMiddleware)

userRoutes.get('/user', UserController.index)
userRoutes.get('/user/:userId', UserController.show)
userRoutes.post('/user', UserController.store)
userRoutes.put('/user/:userId', UserController.update)
userRoutes.delete('/user/:userId', UserController.destroy)

module.exports = userRoutes

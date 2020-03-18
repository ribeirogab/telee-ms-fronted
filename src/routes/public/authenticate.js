const { Router } = require('express')
const AuthController = require('../../controllers/AuthController')
const authenticateRoutes = Router()

authenticateRoutes.post('/authenticate', AuthController.authenticate)

module.exports = authenticateRoutes

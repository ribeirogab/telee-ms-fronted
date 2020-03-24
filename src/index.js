const server = require('./configs/server')
const database = require('./configs/database')
const [publicRoutes, privateRoutes] = require('./routes')
const hooks = require('./configs/hooks')

database.connect()

server.use(publicRoutes)
server.use(privateRoutes)

server.listen(3333, console.log('Server is running: http://localhost:3333'))

hooks.reports()

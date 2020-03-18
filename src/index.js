const database = require('./configs/database')
const server = require('./configs/server')
const publicRoutes = require('./routes/public')
const privateRoutes = require('./routes/private')
const hooks = require('./configs/hooks')

database.connect()

server.use(...publicRoutes)
server.use(...privateRoutes)

server.listen(3333, console.log('Server is running: http://localhost:3333'))

hooks.reports()

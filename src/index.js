const database = require('./configs/database')
const server = require('./configs/server')
const routes = require('./routes')
const hooks = require('./configs/hooks')

database.connect()

server.use(routes)
  .listen(3333, console.log('Server is running: http://localhost:3333'))

hooks.reports()

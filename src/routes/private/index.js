const audit = require('./audit')
const task = require('./task')
const user = require('./user')
const website = require('./website')
const writerTask = require('./writerTask')

module.exports = [audit, task, user, website, writerTask]

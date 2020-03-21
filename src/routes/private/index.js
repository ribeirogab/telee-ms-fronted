const editor = require('./editor')
const writer = require('./writer')
const uninitiatedTasks = require('./uninitiatedTasks')
const audit = require('./audit')
const task = require('./task')
const user = require('./user')
const website = require('./website')
const writerTask = require('./writerTask')

module.exports = [editor, writer, uninitiatedTasks, audit, task, user, website, writerTask]

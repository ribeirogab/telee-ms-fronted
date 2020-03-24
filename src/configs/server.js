require('dotenv').config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env' })
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

module.exports = app

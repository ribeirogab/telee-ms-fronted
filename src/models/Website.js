const { Schema, model } = require('mongoose')

const WebsiteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = model('Website', WebsiteSchema)

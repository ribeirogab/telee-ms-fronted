const { Schema, model } = require('mongoose')

const TaskSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
    required: true
  },
  subKeywords: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  guidelines: [{
    type: String
  }],
  description: String,
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Number,
    required: true
  },
  comments: [{
    type: String
  }],
  content: {
    type: Object,
    required: true
  },
  words: Number,
  value: Number
}, { timestamps: true })

module.exports = model('Task', TaskSchema)

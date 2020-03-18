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
  guidelines: [{
    type: String
  }],
  website: {
    type: String,
    required: true
  },
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
  words: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = model('Task', TaskSchema)

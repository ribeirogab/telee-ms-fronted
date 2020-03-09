const { Schema, model } = require('mongoose')

const ArticleSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  website: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  content: {
    type: Object,
    required: true
  },
  comments: [{
    type: String
  }],
  words: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = model('Article', ArticleSchema)

const { Schema, model } = require('mongoose')

const WriterReportSchema = new Schema({
  month: {
    type: String,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  writerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  acceptArticles: {
    type: Number,
    required: true
  },
  pendingArticles: {
    type: Number,
    required: true
  },
  numberWords: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = model('WriterReport', WriterReportSchema)

const { Schema, model } = require('mongoose')

const GeneralReportSchema = new Schema({
  month: {
    type: Number,
    required: true
  },
  numberWords: {
    type: Number,
    required: true
  },
  acceptArticles: {
    type: Number,
    required: true
  },
  pendingArticles: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = model('User', GeneralReportSchema)

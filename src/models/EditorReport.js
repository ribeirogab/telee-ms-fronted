const { Schema, model } = require('mongoose')

const EditorReportSchema = new Schema({
  month: {
    type: Number,
    required: true
  },
  editor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  },
  salary: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = model('EditorReport', EditorReportSchema)

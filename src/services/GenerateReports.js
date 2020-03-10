const GeneralReport = require('../models/GeneralReport')
const WriterReport = require('../models/WriterReport')
const Article = require('../models/Article')
const User = require('../models/User')

const promiseHelper = require('../utils/promiseHelper')
const getSalary = require('../utils/getSalary')
const saveToDatabase = require('../utils/saveToDatabase')

module.exports = {
  async generalReports () {
    const articles = await Article.find()
    const acceptArticles = articles.filter(article => article.status === 'Aceito')
    const pendingArticles = articles.filter(article => article.status === 'Pendente')
    const numberWords = acceptArticles.reduce((accumulator, article) => accumulator + article.words, 0)
    const totalAmountPayable = getSalary(numberWords)

    const generalReportsObjects = [{
      month: `${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      acceptArticles: acceptArticles.length,
      pendingArticles: pendingArticles.length,
      numberWords,
      totalAmountPayable
    }]

    await saveToDatabase(GeneralReport, generalReportsObjects, generalReportExists)
    return generalReportsObjects

    async function generalReportExists (model, object) {
      const exists = await model.find({ month: { $eq: object.month } })
      return exists.length !== 0
    }
  },

  async writerReports () {
    const writers = await User.find({
      permission: { $eq: 1 }
    })

    const writersObjects = await promiseHelper(writers, generateWriterObjects)
    await saveToDatabase(WriterReport, writersObjects, writerReportExists)
    return writersObjects

    async function generateWriterObjects (writer) {
      const articles = await Article.find({ writer: { $eq: writer._id } })

      const acceptArticles = articles.filter(article => article.status === 'Aceito')
      const pendingArticles = articles.filter(article => article.status === 'Pendente')
      const numberWords = acceptArticles.reduce((accumulator, article) => accumulator + article.words, 0)
      const salary = getSalary(numberWords)

      return {
        month: `${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        writer: writer.name,
        writerId: writer._id,
        numberWords,
        acceptArticles: acceptArticles.length,
        pendingArticles: pendingArticles.length,
        salary
      }
    }

    async function writerReportExists (model, object) {
      const exists = await model.find({
        $and: [{ month: { $eq: object.month } }, { writer: { $eq: object.writer } }]
      })
      return exists.length !== 0
    }
  }
}

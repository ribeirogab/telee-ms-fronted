const Article = require('../models/Article')

const countWords = require('../utils/countWords')

module.exports = {
  async index (req, res) {
    try {
      const articles = await Article.find()
      return res.json(articles)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed article!' })
    }
  },

  async show (req, res) {
    try {
      const { articleId } = req.params
      const article = await Article.findById(articleId)
      return res.json(article)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed article!' })
    }
  },

  async store (req, res) {
    try {
      const { writer } = req.headers
      const { website, status, content, comments } = req.body

      const [words, value] = countWords(content)

      const article = await Article.create({
        writer, website, status, content, comments, words, value
      })

      return res.json(article)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new article!' })
    }
  },

  async update (req, res) {
    try {
      const { articleId } = req.params
      const { updatedArticle } = req.body
      const article = await Article.findByIdAndUpdate(articleId, updatedArticle, { new: true })
      return res.json(article)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error updating article!' })
    }
  },

  async destroy (req, res) {
    try {
      const { articleId } = req.params
      await Article.findByIdAndDelete(articleId)
      return res.json({ message: 'Article deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error deleting article!' })
    }
  }
}

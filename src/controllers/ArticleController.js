const Article = require('../models/Article')

module.exports = {
  async index (req, res) {
    try {
      const articles = await Article.find()
      return res.json(articles)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error listed article!' })
    }
  },

  async show (req, res) {
    try {
      const { articleId } = req.params
      const article = await Article.findById(articleId)
      return res.json(article)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error listed article!' })
    }
  },

  async store (req, res) {
    const { owner } = req.headers
    const { website, status, content, comments, words, value } = req.body

    const article = await Article.create({
      owner, website, status, content, comments, words, value
    })

    return res.json(article)
  },

  async update (req, res) {
    try {
      const { articleId } = req.params
      const { updatedArticle } = req.body
      const article = await Article.findByIdAndUpdate(articleId, updatedArticle, { new: true })
      return res.json(article)
    } catch (error) {
      return res.status(400).send({ error, message: 'Error updating article!' })
    }
  },

  async destroy (req, res) {
    try {
      const { articleId } = req.params
      await Article.findByIdAndDelete(articleId)
      return res.json({ message: 'Article deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error, message: 'Error deleting article!' })
    }
  }
}

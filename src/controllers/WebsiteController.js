const Website = require('../models/Website')

module.exports = {
  async index (req, res) {
    try {
      const websites = await Website.find()
      return res.json(websites)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed website!' })
    }
  },

  async show (req, res) {
    try {
      const { websiteId } = req.params
      const website = await Website.findById(websiteId)

      if (!website) throw new Error('Site não encontrado!')

      return res.json(website)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error listed website!' })
    }
  },

  async store (req, res) {
    try {
      const { title, url, ip } = req.body
      const website = await Website.create({ title, url, ip })
      return res.json(website)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error create a new website!' })
    }
  },

  async update (req, res) {
    try {
      const { websiteId } = req.params
      const { updatedWebsite } = req.body
      const website = await Website.findByIdAndUpdate(websiteId, updatedWebsite, { new: true })
      return res.json(website)
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error updating website!' })
    }
  },

  async destroy (req, res) {
    try {
      const { websiteId } = req.params
      await Website.findByIdAndDelete(websiteId)
      return res.json({ message: 'Website deleted successfully!' })
    } catch (error) {
      return res.status(400).send({ error: error.message, message: 'Error deleting website!' })
    }
  }
}

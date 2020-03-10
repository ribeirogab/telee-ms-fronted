const { writerReports, generalReports } = require('../services/GenerateReports')

module.exports = {
  async reports () {
    setInterval(() => {
      const date = new Date()
      if (date.getDate() === 1) {
        writerReports()
        generalReports()
      }
    }, 86400000)
  }
}

const { editorReports, generalReports } = require('../services/GenerateReports')

module.exports = {
  reports () {
    setInterval(() => {
      const date = new Date()
      if (date.getDate() === 1) {
        editorReports(date.getDate(), date.getMonth(), date.getFullYear())
        generalReports(date.getDate(), date.getMonth(), date.getFullYear())
      }
    }, 86400000)
  }
}

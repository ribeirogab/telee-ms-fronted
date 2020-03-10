module.exports = function countWords (content) {
  const arrWords = []
  const valuePerWord = 0.06

  arrWords.push(...content.body.split(' '))
  arrWords.push(...content.footer.split(' '))

  const numberOfWords = arrWords.length
  const totalValue = numberOfWords * valuePerWord

  return [numberOfWords, totalValue]
}

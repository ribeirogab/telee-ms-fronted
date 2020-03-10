module.exports = function promiseHelper (list, anAsyncFunction) {
  return Promise.all(list.map(item => anAsyncFunction(item)))
}

module.exports = async function saveToDatabase (model, objects, exists) {
  objects.forEach(async object => {
    if (!await exists(model, object)) await model.create(object)
  })
}

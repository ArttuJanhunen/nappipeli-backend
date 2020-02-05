const mongoose = require('mongoose')

const clickSchema = new mongoose.Schema({
  amount : 0,
})

clickSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id= returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})


const Click = mongoose.model('Click', clickSchema)

module.exports = Click
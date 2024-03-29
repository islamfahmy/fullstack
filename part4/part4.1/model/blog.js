const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
   delete returnedObject.id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Blog', blogSchema)

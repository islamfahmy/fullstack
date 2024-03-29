const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {type :Number,default :0},
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
  })
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
   //delete returnedObject.id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Blog', blogSchema)

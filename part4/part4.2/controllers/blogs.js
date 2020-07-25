const blogRouter = require('express').Router()
const Blog = require('../model/blog')
blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  
  const blog = new Blog(request.body)
      if(blog.title===undefined||blog.url===undefined)
      {
         blog.then(response.status(400))
      }
      else {
  blog
    .save()
    .then(result => {
      response.status(200).json(result)
    })
  }
})
blogRouter.delete('/:id',async(request,response)=>{
    // console.log(request.params.id)
      await Blog.findByIdAndRemove(request.params.id)
    response.status(200).send()
})
blogRouter.put('/:id',async(request,response)=>{
   
  const blog = await Blog.findById(request.params.id)
  blog.likes=Number(request.body)
  await Blog.findByIdAndUpdate(request.params.id,blog)
  response.status(200).send() 
})

module.exports = blogRouter
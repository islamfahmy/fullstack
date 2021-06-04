const blogRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
blogRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async(request, response) => {
  const body = request.body 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog(body)
  console.log(user)
 blog.user =user._id
      if(blog.title===undefined||blog.url===undefined)
      {
         blog.then(response.status(400))
      }
      else {
  const result =await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
        response.status(200).json(result.toJSON())
  }
})


blogRouter.delete('/:id',async(request,response)=>{
    // console.log(request.params.id)
      const blog = await Blog.findById(request.params.id)
      const body = request.body 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
    if(blog.user.toString()!==user._id.toString())
    {
      return response.status(400).json({error:'not your blog to delete' })
    }
    user.blogs = user.blogs.filter(f=>f.toString()!==blog._id.toString())
    user.blogs=[]
     await User.findByIdAndUpdate(user._id,user)
    await Blog.findByIdAndRemove(request.params.id)

    response.status(200).send()
})
blogRouter.put('/:id',async(request,response)=>{
   
  const blog = await Blog.findById(request.params.id)
  blog.likes=Number(request.body.likes)
  await Blog.findByIdAndUpdate(request.params.id,blog)
  response.status(200).send() 
})
blogRouter.get('/:id', async (request, response) => {
 const blog = await Blog.findById(request.params.id)
 if(blog)
  response.json(blog.toJSON())
return response.status(404).json({ error: '404 not found' })
  })


module.exports = blogRouter
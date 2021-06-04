const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(!body.username||!body.password||body.username.length<3||body.password.length<3)
  {
      response.status(400).json("invalid input")

  }else {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
}
})
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{ title: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter
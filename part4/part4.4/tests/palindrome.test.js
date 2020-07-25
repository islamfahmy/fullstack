const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../model/blog')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../model/user')
const helper =require('./test_helper.js')
/*describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    
   await User.deleteMany({})
    //await blog.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash:passwordHash })
      await user.save()
    const x = await User.find({})
     console.log(x)
  
  },10000)
 test('users', async () => {
     
    
     expect(x).toHaveLength(1)
  })

afterAll(() => {
  mongoose.connection.close()
})*/
  
  describe('testing creating user with invalid credentials',()=>{
      beforeEach(async () => {
    jest.useFakeTimers()

  })
      test('user name less than 3',async()=>{
        await api.post('/api/users').send({username: 'o', password:'o'}).expect(400)

})
      test(' no user name ',async()=>{
           await api.post('/api/users').send({ password:'koooo'}).expect(400)
      })
      afterAll(() => {
  mongoose.connection.close()
})
    })


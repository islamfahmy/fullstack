const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../model/blog')
const api = supertest(app)
 const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }
  , { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", __v: 0 }, 
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2007/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
   { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2007/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
   { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2006/05/01/TypeWars.html", likes: 2, __v: 0 }]
 
beforeEach(async () => {
  await blog.deleteMany({})

  let noteObject = new blog(blogs[0])
  await noteObject.save()
  

   
})


test('Test get ', async () => {
   const response = await api.get('/api/blogs')
   expect(response.body).toHaveLength(1)
 
   
})
test('test that verifies that the unique identifier property',async()=>{
  const response = await api.get('/api/blogs')
 // console.log(response)
 expect(response.body[0].id).toBeDefined()     
})
test('Test post', async () => {
    var init =1 ;
    await api.post('/api/blogs').send(blogs[1]).expect(200).expect('Content-Type', /application\/json/)
    response = await api.get('/api/blogs')
   expect(response.body).toHaveLength(init+1)  
})
test('Test likes',async () => {
  
   await api.post('/api/blogs').send(blogs[2]).expect(200).expect('Content-Type', /application\/json/)
})
test('Verify title and url properties',async()=>{
    const blogie={_id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", likes: 2, __v: 0 }
 await api.post('/api/blogs').send(blogie).expect(400)
})
test('Test Delete blog',async()=>{
      var x = blogs[0]._id;
     await api.delete('/api/blogs/'+x).send(x).expect(200)
} )
test('update blog',async()=>{
  await api.put('/api/blogs/'+blogs[0]._id).send("1").expect(200)
})
   
afterAll(() => {
  mongoose.connection.close()
})

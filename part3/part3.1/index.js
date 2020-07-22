const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json())

//app.use(morgan('tiny'))
/*app.use('/',(req,res)=>{
  console.log("entry")  
  res.send('our first express')
})*/  
morgan.token('request-body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
    ,tokens['request-body'](req, res),
  ].join(' ')
})
)
app.use(express.json())
const PORT = 3001

let persons = [
  {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]
app.get('/api/persons',(request,response)=>{
  console.log("there")
response.json(persons)

})
app.get('/api/persons/:id',(request,response)=>{
   
    const id = request.params.id
    const person = persons.find(person=> person.id===Number(id))
    if(person)
      return response.json(person)
    response.status(400).json({ 
      error: 'content missing' })
    })
app.get('/info',(request,response)=>{
   var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear()+" "   
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+ " GMT+0200(Easter European Standard Time)";

response.send(
  "<div><p>phone book has info for "+persons.length+" persons </p><p> "+ datetime+"</p>"+"</div>")

})
app.delete('/api/persons/:id',(request,response)=>{
const id = Number(request.params.id)
persons=persons.filter(note=>note.id!==id)
response.send()
})
app.post('/api/persons',(request,response)=>{
  const person=request.body
 // console.log(JSON.stringify(person))
  if(!person.name||!person.number)
    return response.status(400).json({ error: 'content missing' })

   if(persons.find(p=>p.name===person.name))
    return response.status(400).json({ error: 'name must be unique' })
  person.id=Math.ceil(Math.random()*10000)
  persons =persons.concat(person)
  response.json(person)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

/*app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)

  response.json(note)
})*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

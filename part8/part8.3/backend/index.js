const { ApolloServer,UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI ='mongodb+srv://eshta:eshta@cluster0-ruucx.mongodb.net/blog?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })




const typeDefs = gql`
  type Book {
    title : String!
    published : Int!
    id : ID!
    genres : [String!]!

  }
  type Author {
    name :String!
    born : Int 
    id :ID!
    bookCount : Int
  }
  type User {
  username: String!
  id: ID!
   }

  type Token {
  value: String!
  }

  type Query {
   bookCount : Int!
  authorCount : Int!
  allBooks(author:String ,genre:String) : [Book!]!
  allAuthors: [Author!]!
  me: User
    }
  type Mutation {
  addBook(
    title: String!
    published: Int!
    genres: [String!]!
  ): Book
  editAuthor(
   name :String!
   setBornTo: Int!

  ):Author
  addAuthor(
     name :String!
     born:Int!
  ):Author
  createUser(
    username: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}


`

const resolvers = {
  Query: {
    bookCount :()=>Book.collection.countDocuments(),
   authorCount:()=>Author.collection.countDocuments(),
   allBooks :(root,args)=>{
       return Book.find({}) 
  },
   allAuthors:()=>Author.find({}),
    me: (root, args, context) => {
    return context.currentUser
  }
},
Author:{
  //bookCount: (root) => books.filter(b => b.author === root.name).length,
  
},
Mutation: {
createUser: (root, args) => {
    const user = new User({ username: args.username })

    return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secred' ) {
      throw new UserInputError("wrong credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, JWT_SECRET) }
  },
    addBook: (root, args,context) => {
      if(!context.currentUser)
        {throw new UserInputError("wrong authorization")
 return null
} 

          if(args.title.length<2)
{throw new UserInputError("too short book title")
 return null
} 
      const book = new Book ({ ...args})
      return book.save()
    },
    editAuthor:(root,args,context) => {
      if(!context.currentUser)
        {throw new UserInputError("wrong authorization")
 return null
} 

     const author = authors.find(f=>f.name===args.name)
     
     if(!author)  throw new UserInputError('No such user in Database')
     author.born =args.setBornTo
     return author
    }
  , addAuthor:(root,args)=>
  {
        if(args.name.length<4)
{throw new UserInputError("too short name")
 return null
} 
     const author = new Author({...args})
     return author.save()
  }
}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
      
    const auth = req ? req.headers.authorization : null
     
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      console.log(currentUser)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
         allAuthors
         {
         	name
         	born
         	bookCount
          id
         }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($genre:String)
   {
         allBooks(genre:$genre)
         { author
         	title
         	id
         	published
          genres
         }
  }

`
export const TEST = gql`
  query 
   {
         allBooks
         { author
          title
          id
          published
          genres
         }
  }

`

export const LOGIN = gql`
  
  mutation login($username:String! ,$password:String!)
  {
     login(
   username:$username,
   password:$password
  ){
    value
  }
}
`
export const CREATE_BOOK = gql`
  
  mutation createBook($title:String! ,$author:String!,$published:Int!,$genres:[String!]!)
  {
     addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ){
  	author
    title
    id
    published
    genres
  }
}
`
export const SET_DATE =gql`
  mutation edit($name:String!,$setBornTo:Int!){
editAuthor(
   name :$name
   setBornTo: $setBornTo

  ){name}
}
`
export const BOOK_ADDED = gql`
  subscription {
     bookAdded{
    author
    title
    id
    published
    genres
      }
  }
  
`



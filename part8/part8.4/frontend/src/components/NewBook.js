import React, { useState } from 'react'
import { useMutation,useQuery,useApolloClient } from '@apollo/client'
import {CREATE_BOOK} from'../utils/queries'
import {ALL_BOOKS,ALL_AUTHORS} from'../utils/queries'
import {SET_DATE} from '../utils/queries'
const NewBook = (props) => {
  const client = useApolloClient();
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
 const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
        update: (store, response) => {
          console.log("here")
          console.log(response.data.addBook)
            updateCacheWith(response.data.addBook);
        }
    });

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => {
            console.log(object, addedBook)
            return set.map(p => p.id).includes(object.id);
        }
        console.log("before")
        const dataInStore = client.readQuery({ query: ALL_BOOKS ,variables: {genre:"all",},})
        console.log("after")
        console.log(dataInStore)
          client.writeQuery({
        query: ALL_BOOKS,
        variables: {genre:"all"},
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, addedBook ]
        }
      })
    
        }
  const result = useQuery(ALL_AUTHORS)
    if (result.loading)  {
    return <div>loading...</div>
  }
  const authors=result.data.allAuthors
  
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({
      variables: {
        title: title,
        author: authors.find(a=>a.name.toString()===author.toString()).id.toString(),
        published: Number(published),
        genres: genres,
      }})
setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
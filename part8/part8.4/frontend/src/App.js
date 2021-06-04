import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/login'
import {useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import {BOOK_ADDED} from './utils/queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
   const client = useApolloClient()

const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data.bookAdded)
      window.alert("book "+subscriptionData.data.bookAdded.title+ " is added");
    }
  })



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token&&
        <button onClick={() => setPage('add')}>add book</button>}
        {token&&<button onClick={() => logout()}>logout</button>}
        {!token&&<button onClick={() => setPage('login')}>login</button>}
        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      <Login
        show={page === 'login'}
        setToken={setToken} 
        setPage={setPage}
      />


    </div>
  )
}

export default App
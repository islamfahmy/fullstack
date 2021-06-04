import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'
import Notf from './components/Notification'
const App = () => {
 
 
  
  
  return (
    <div>
      <Notf/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm />
      
    </div>
  )
}

export default App
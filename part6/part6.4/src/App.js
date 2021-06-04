import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'
import Notf from './components/Notification'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const App = () => {
 const 	 dispatch = useDispatch()
 const initializeAnec = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: notes,
    })
  }
  }
  useEffect(() => {
    dispatch(initializeAnec()) 
  },[dispatch]) 

 
  
  
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
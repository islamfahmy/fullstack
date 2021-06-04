import React from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
 
const NewAnecdote = (props) => {

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
    id:getId()
  }
}

const dispatch = useDispatch()
const createanci=(data)=>{
      return async dispatch => {
    const newNote = await anecdoteService.createNew(asObject(data))
    dispatch({
      type: 'CREATE',
      content: newNote,
    })
  }
  }
 
    
  const create=async (event)=>{
    event.preventDefault()
  const content = event.target.ance.value
  dispatch(createanci(content))
    dispatch({type:'SET',data:"Created "})
  }

  return (<div>
<h2>create new</h2>
      <form onSubmit={create}>
        <input name="ance" /> 
        <button type="submit">add</button>
      </form>
      </div>)
}
export default NewAnecdote
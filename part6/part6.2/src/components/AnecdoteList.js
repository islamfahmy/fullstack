import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
const AnecdoteList=(props)=>
{const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteaction(id))
    dispatch({type:'SET',data:"you voted to '"+anecdotes.find(a=>a.id===id).content+"'"})
    setTimeout(() => {
        dispatch({type:'Remove'})
      }, 5000) 
     
  }
  const voteaction=(id)=>({
   type:'VOTE',
      data:{id:id }
      
   } )
  
	return (
	<div>	<h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}</div>
		)
}
export default AnecdoteList
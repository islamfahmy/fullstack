import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'
const voteaction=(id)=>{
      return async dispatch => {
    anecdoteService.vote(id)   
    dispatch({
      type: 'VOTE',
      data: {id:id},
    })
  }
  }
  const setNotify=(cont)=>
  {
    return ({type:'SET',data:"you voted to '"+cont+"'"})
  }
  const remNotify=()=>
  {
    return ({type:'Remove'})
  }
const AnecdoteList=(props)=>
{ const dispatch = useDispatch()

  const vote = (id) => {
    anecdoteService.vote(id)   
    props.voteaction(id)
    props.setNotify(props.anecdotes.find(a=>a.id===id).content)
    setTimeout(() => {
        props.remNotify()
      }, 5000) 
     
 }
  
	return (
	<div>	<h2>Anecdotes</h2>
      {props.anecdotes.map(anecdote =>
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
  const mapStateToProps = (state) => {
  console.log("state is "+state)
  return {
    anecdotes: state.anecdote,
    filter: state.filter
  }
}
const mapDispatchToProps = {
  voteaction,setNotify,remNotify
}
const ConnectedAnec = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnec
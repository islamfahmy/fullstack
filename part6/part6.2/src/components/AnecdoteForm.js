import React from 'react'
import { useDispatch } from 'react-redux'
const NewAnecdote = (props) => {
const dispatch = useDispatch()
const createanci=(content)=>(
      {type:'CREATE',
      data:content}
    )
    
  const create=(event)=>{
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
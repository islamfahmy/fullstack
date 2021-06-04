import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
  
const Filter = () => {
const dispatch = useDispatch()
  const handleChange = (event) => {
       event.preventDefault()
       dispatch({type:'FILTER',data:event.target.value})    
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
const mapStateToProps = (state) => {
if(state.type==='FILTER')
  {
    return state.anecdotes(a=> a.content.includes(state.data))
  }
}
export default Filter
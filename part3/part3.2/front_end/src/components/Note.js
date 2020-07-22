	import React from 'react'

  const person = ({ person ,delete_person}) => {
      return (
      <div> 
      <p>{person.name}  {person.number} <button onClick={delete_person}>  delete </button></p>

      </div>
        )
    }
  
export default person
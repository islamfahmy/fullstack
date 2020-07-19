
import React, { useState } from 'react'

const Personform=({addName,handleChange,handleChangeNum,newName,newNumber})=>
{   
  
	return (
     <form onSubmit={addName}>
        <div>
          name:
           <input
           onChange={handleChange}
          value = {newName}
           />
        </div>
        <div>number: <input onChange={handleChangeNum}
          value = {newNumber}
           /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
	)
}
export default Personform
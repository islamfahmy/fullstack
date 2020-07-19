import React, { useState } from 'react'
 const Filter =({handleChangeSearch,search,trigger,showAll})=>
 {

 	    return(
 		 <div>
          name:
           <input
           onChange={handleChangeSearch}
          value = {search}
           />
           
        <button onClick={trigger}>
           {showAll ? 'search' : 'showall' }
        </button>
      </div>
      )
          
       
 }
 export default Filter
import React from 'react'
import {
useParams
} from "react-router-dom"
const User=({blogs})=>
{
const id =useParams().id
blogs =blogs.filter(b=> b.user.toString()!==id.toString())
return (
    
    <div>{ blogs.map(b=><li> {b.title}</li>)
                      
    	} </div> 
)
       	
}

export default User
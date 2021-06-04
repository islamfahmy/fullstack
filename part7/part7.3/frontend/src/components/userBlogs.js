import React from 'react'
import {
useParams
} from "react-router-dom"

const User=(blog)=>
{   console.log(blog)
	const id =useParams().id
    const blogs =blog.filter(b=> b.user===id)[0]
   	console.log(blogs)
   	return (
    
    <div>{ blogs.map(b=><li> {b.name}</li>)
                      
    	} </div> 
)
   
}

export default User
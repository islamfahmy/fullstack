import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams
} from "react-router-dom"

const usersform=({users})=>
{
       return (
       	<div>
       <h2> Users </h2>
       <h3> &nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; blogs created </h3>
       {users.map(u=><li key ={u.id}>
        <Link to={`/user/${u.id}`}>{u.name}</Link>&nbsp;&nbsp;&nbsp;{u.blogs.length}
       </li> )}
       </div>
       )
}
export default usersform
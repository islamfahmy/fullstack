import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import UserBLogs from './userBlogs'

const users=({name ,number,id,blogs})=>
{  
	 const padding = {
    padding: 5
  }
     console.log(id)
return (
      <div>
      <Router>
        <Link style={padding} to={"/user/"+id}>{name}</Link> &nbsp;&nbsp;&nbsp;&nbsp; {number}
        <Switch>
      <Route path="/user/:id">
        <UserBLogs blogs={blogs} />
      </Route>
      </Switch>
        </Router>
        </div>
	)
}
export default users
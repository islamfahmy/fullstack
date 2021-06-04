import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import userService from '../services/users'
const  initializeNotes = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}
const create=({title,author,url})=>
{
	 return async dispatch => {
        await blogService.create({title,author,url})
          const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}
const remove=(blog)=>
{

	return async dispatch => {
	await blogService.remove(blog)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
    
}
const like =(blog)=>
{
	return async dispatch => {
	blog.likes++
    await blogService.change(blog)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}
const notify=(data)=>
{
 return { type:'SET',data:data}	
}
const login=(USER)=>
{
  return {type:'LOGIN',data:USER} 
}
const logout=(USER)=>
{ return {type:'LOGOUT'} 
}
const fetch =()=>
{
  return async dispatch => {
  
    const users = await userService.no_blogs()
    console.log(users)
    dispatch({
      type: 'FETCH',
      data: users,
    })
  }
}
export default {
	initializeNotes,create,remove,like,notify,login,logout,fetch
		}


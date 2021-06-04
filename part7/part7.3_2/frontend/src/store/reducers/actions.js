import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../../services/blogs'
import userService from '../../services/login'
import usersService from '../../services/users'

const  initializeNotes = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}
const create=(blog)=>
{
	 return async dispatch => {
        await blogService.create(blog)
          const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}
const remove=(id)=>
{

	return async dispatch => {
	await blogService.remove(id)
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
    await blogService.update(blog)
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
const clearNotif=()=>
{
 return { type:'REMOVE'} 
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
  
    const users = await usersService.getAll()
    console.log(users)
    dispatch({
      type: 'FETCH',
      data: users,
    })
  }
}
export default {
	initializeNotes,create,remove,like,notify,login,logout,fetch,clearNotif
		}


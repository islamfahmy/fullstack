import React from 'react'
const Blog = ({ blog ,handlelike,handleDelete,user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if(!user) user = 1 ;
   return (
    <div style={blogStyle}>
    <div>
    {blog.title} &nbsp;
    {blog.author}<br/>
    <div>likes:<span>{blog.likes}</span><button onClick={handlelike}>like</button><br/></div>
    {blog.url}   
    {blog.user&&(user===blog.user.id.toString())?<div><button onClick={handleDelete}>delete</button><br/></div>:<div/>}
  </div>  
  </div>
)
}
export default Blog

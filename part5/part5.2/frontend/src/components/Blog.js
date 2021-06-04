import React from 'react'
const Blog = ({ blog ,handlelike,handleDelete,user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
   return (
    <div style={blogStyle}>
    <div>
    {blog.title}<br/>
    {blog.author}<br/>
    likes:{blog.likes}<button onClick={handlelike}>like</button><br/>
    {blog.url}   
    {(user===blog.user.id.toString())?<div><button onClick={handleDelete}>delete</button><br/></div>:<div/>}
  </div>  
  </div>
)
}
export default Blog

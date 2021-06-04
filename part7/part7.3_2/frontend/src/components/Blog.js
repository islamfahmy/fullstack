import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams,Redirect
} from "react-router-dom"

const Blog = ({ blogs, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)
  const id =useParams().id
  console.log(blogs)
  console.log(id)
  const blog =blogs.find(b=> b.id.toString()===id.toString())
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'
  
  return (<div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog
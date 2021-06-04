import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
const App = () => {
 const [username, setUsername] = useState('') 
 const [password, setPassword] = useState('') 
 const [title,setTitle] = useState(null)
 const [author,setAuthor] = useState(null)
 const [url,setUrl] = useState(null)
 const [user, setUser] = useState(null)
 const [blogs, setBlogs] = useState([])
 const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
 const handlelogout =  (event)=>
 {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
      setUsername('')
      setPassword('')
 }

   const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
   	       
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
  
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleCreate=async(event)=>{
    event.preventDefault()
    try {
        await blogService.create({title,author,url})
            blogService.getAll().then(blogs =>
      setBlogs( blogs ))
        setUrl('') 
        setTitle('')
        setAuthor('')
    }catch (exception) {
      setErrorMessage('blog isnt added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    if(!errorMessage)
     {
     setErrorMessage('User added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
     }
  }

const createForm=()=>(
   <form onSubmit={handleCreate}>
   <div>
   {errorMessage}
   <h2>create blog</h2>
        title &nbsp;
          <input
          type="text"
          value={title }
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author &nbsp;
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url &nbsp;
          <input
          type="text"
          value={url }
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
        <h1>{errorMessage}</h1>
      <button type="submit">add blog</button>
    </form>
) 

const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      <h2>Log in to application</h2>
        username &nbsp;
          <input
          type="text"
          value={username }
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password &nbsp;
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <h1>{errorMessage}</h1>
      </div>
      <button type="submit">login</button>
    </form>      
  )
const blogForm=()=>(
 <div>
  <h2>{errorMessage}</h2>
 {createForm()}
    {username}<button onClick={handlelogout}>logut</button>
  <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

   </div>
  )



    

  return (
    <div>
 	{user === null && loginForm()}     
   {user !== null && blogForm()} 
    </div>
  )
}

export default App

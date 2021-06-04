import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import LoginForm from './forms/login'
import BlogForm from  './forms/blog'
import Togglable from './helper/togglable'
const App = () => {
 const [loginVisible, setLoginVisible] = useState(false)
 const [username, setUsername] = useState('') 
 const [password, setPassword] = useState('') 
 const [title,setTitle] = useState(null)
 const [author,setAuthor] = useState(null)
 const [url,setUrl] = useState(null)
 const [user, setUser] = useState(null)
 const [blogs, setBlogs] = useState([])
 const [errorMessage, setErrorMessage] = useState(null)
 const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(   blogs.sort(function(a, b) {
  return b.likes - a.likes;
}) )

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
      console.log("ueser ="+user.username.toString())
   	       
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
  const handleLike=async(blog)=>{
   blog.likes++
    await blogService.change(blog)
   const res= await blogService.getAll()
      setBlogs(res.sort(function(a, b) {
  return b.likes - a.likes;
}))
    
  }
  const handleCreate=async(event)=>{
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
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
     setErrorMessage('blog added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
     }
   
  }
  const handleDelete = async(blog)=>
  { if (window.confirm("delete "+blog.title)) { 
    await blogService.remove(blog)
    const res= await blogService.getAll()
      setBlogs(res.sort(function(a, b) {
      return b.likes - a.likes;
      }))
     }
  }


const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
const blogForm=()=>{
       return (
 <div>
  <h2>blogs</h2>
      {blogs.map(blog =>
         <Togglable buttonLabel="show" name={blog.title} >
         <Blog key={blog.id} blog={blog} handlelike={()=>handleLike(blog) } handleDelete={()=>handleDelete(blog)} user={user.id.toString()} />
          </Togglable>
      )}
    <Togglable buttonLabel='add note' ref={blogFormRef}>
   <BlogForm  handleCreate={handleCreate}
  handleTitle={({ target }) => setTitle(target.value)}
  handleAuthor={({ target }) => setAuthor(target.value)}
  handleurl={({ target }) => setUrl(target.value)}
  title={title}
  author={author}
  url={url}
  />
    </Togglable>
    {username}<button onClick={handlelogout}>logut</button>

   </div>
  )}



    

  return (
    <div>
 	{user === null && loginForm()}     
   {user !== null && blogForm()} 
    </div>
  )
}

export default App

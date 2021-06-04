import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Use from './components/users'
import UserBLogs from './components/userBlogs'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams
} from "react-router-dom"
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login' 
import LoginForm from './forms/login'
import BlogForm from  './forms/blog'
import Togglable from './helper/togglable'
import { useSelector, useDispatch } from 'react-redux'
import actions from './reducers/actions'
const App = () => { 
   
 const dispatch = useDispatch()
  useEffect(() => {
 dispatch(actions.fetch());
 dispatch(actions.initializeNotes())    
  },[]) 
 const errorMessage=useSelector(state => state.notif)
 const blogs = useSelector(state => state.blog) 
 console.log(blogs)
 const user = useSelector(state=> state.user)
 const users = useSelector(state=> state.users)
 const [loginVisible, setLoginVisible] = useState(false)
 const [username, setUsername] = useState('') 
 const [password, setPassword] = useState('') 
 const [title,setTitle] = useState(null)
 const [author,setAuthor] = useState(null)
 const [url,setUrl] = useState(null)
 const blogFormRef = React.createRef()

 
   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {

      const data = JSON.parse(loggedUserJSON)
      console.log(data)
      dispatch(actions.login(data))
      blogService.setToken(data.token)
    }
  }, [])
 const handlelogout =  (event)=>
 {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(actions.logout())
    setUsername('')
    setPassword('')
 }

   const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = await loginService.login({
        username, password,
      })       
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(data)
      )
      dispatch(actions.login(data))
      blogService.setToken(data.token)
      setUsername('')
      setPassword('')
  
    } catch (exception) {
       dispatch(actions.notify('Wrong credentials'))
      setTimeout(() => {
        dispatch({ type:'REMOVE'})
   
      }, 5000)
    }
  }
  const handleLike=(blog)=>{
   dispatch(actions.like(blog))
  }
  const handleCreate=async(event)=>{
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(actions.create({title,author,url}))
    setUrl('') 
    setTitle('')
    setAuthor('')
    dispatch(actions.notify('blog added'))
    setTimeout(() => {
   dispatch({ type:'REMOVE'})
    }, 5000) 
     
   
  }
  const handleDelete = async(blog)=>
  { if (window.confirm("delete "+blog.title)) { 
      dispatch(actions.remove(blog))
    
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
    {user.name}<button onClick={handlelogout}>logut</button>
    <h2>Users </h2>
      <h3> &nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; blogs created </h3>
      
     
      </div>
       )}



    

  return (
    <div>
     <div className="error">
      {errorMessage}
    </div>
  {user === null && loginForm()}     
   {user !== null && blogForm()}
   <Router>
      
    {users.map(note =>
        <li key={note.id}>
          <Link to={`/user/${note.id}`}>{note.name}</Link>
        </li>
      )}
          <Switch>
      <Route path="/user/:id">
        <UserBLogs blogs={blogs}  />
      </Route>
      </Switch>
        </Router>
       
    </div>
  )
}


export default App

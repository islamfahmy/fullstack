import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import UserBLogs  from './components/userblogs'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UsersForm from './components/usersform'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'
import actions from './store/reducers/actions'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams,Redirect,useHistory
} from "react-router-dom"
const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const App = () => {
   const history = useHistory()
   const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.initializeNotes());
    dispatch(actions.login(storage.loadUser()))   
    dispatch(actions.fetch()) 
  }, [])
   const blogs = useSelector(state => state.blog) 
   const user = useSelector(state=> state.user)
   const users = useSelector(state=> state.users)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const notification =useSelector(state => state.notif)
   const blogFormRef = React.createRef()



  const notifyWith = (message, type='success') => {
    dispatch(actions.notify({message,type}))
    setTimeout(() => {
      dispatch(actions.clearNotif())
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const tryuser = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(actions.login(tryuser))
      notifyWith(`${tryuser.name} welcome back!`)
      storage.saveUser(tryuser)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(actions.create(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {

    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(actions.like(likedBlog))
  //  setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(actions.remove(id))
      //  history.push('/')
    }
  }

  const handleLogout = () => {
    dispatch(actions.logout())
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    <Router>
      <Switch>

      <Route path="/user/:id">
        <UserBLogs blogs={blogs}  />
      </Route>
      <Route path="/blog/:id">
        {blogs.length ? <Blog blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} own={true}/>  : <Redirect to="/" />}
      </Route>
      <Route path="/">
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.sort(byLikes).map(blog =>
         <div style={blogStyle} className='blog'>
        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </div>)}
      <UsersForm users={users}/>
      </Route>  
      </Switch>
    </Router>
    </div>
   
  )
}

export default App
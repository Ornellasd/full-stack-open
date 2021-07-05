import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAlerts } from './reducers/alertReducer'
import { initializeBlogs } from './reducers/blogReducer' 

import Alert from './components/Alert'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()

  const alerts = useSelector(state => state.alerts)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      dispatch(setAlerts(['Wrong username or password'], 'error', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try{
      const newBlog = await blogService.create(blogObject)
      dispatch(setAlerts([`${newBlog.title} added`], 'success', 5))
    } catch(e) {
      dispatch(setAlerts(Object.values(e.response.data), 'error', 5))
    }
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}  />
        </Togglable>
      </div>
    )
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {(alerts.content) && alerts.content.map((alert, index) =>
          <Alert message={alert} type={alerts.type} key={index} />
        )}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  console.log(blogs)
  return (
    <div>
      {(alerts.content) && alerts.content.map((alert, index) =>
        <Alert message={alert} type={alerts.type} key={index} />
      )}
      <h2>blogs</h2>
     
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      {blogForm()}
      
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      )}
    </div>
  )
}

export default App
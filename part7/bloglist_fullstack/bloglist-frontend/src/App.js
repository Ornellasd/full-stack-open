import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setAlerts } from './reducers/alertReducer'
import { getBlogs } from './reducers/blogReducer' 
import { login } from './reducers/userReducer'

import Alert from './components/Alert'
import Blog from './components/Blog'
// import LoginForm from './components/LoginForm'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()

  const alerts = useSelector(state => state.alerts)

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(getBlogs())
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

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const user = await loginService.login({
  //       username, password
  //     })

  //     window.localStorage.setItem(
  //       'loggedBloglistUser', JSON.stringify(user)
  //     )

  //     blogService.setToken(user.token)
  //     setUser(user)
  //     setUsername('')
  //     setPassword('')
  //   } catch(exception) {
  //     dispatch(setAlerts(['Wrong username or password'], 'error', 5))
  //   }
  // }

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login())
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  // if(user === null) {
  //   return (
  //     <div>
  //       <h2>Log in to application</h2>
  //       {(alerts.content) && alerts.content.map((alert, index) =>
  //         <Alert message={alert} type={alerts.type} key={index} />
  //       )}
  //       <LoginForm
  //         username={username}
  //         password={password}
  //         handleUsernameChange={({ target }) => setUsername(target.value)}
  //         handlePasswordChange={({ target }) => setPassword(target.value)}
  //         handleLogin={handleLogin}
  //       />
  //     </div>
  //   )
  // }

  if(user === null) {
    return (
      <Login />
    )
  }

  return (
    <div>
      {(alerts.content) && alerts.content.map((alert, index) =>
        <Alert message={alert} type={alerts.type} key={index} />
      )}
      <h2>blogs</h2>
     
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      <BlogForm />
      
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
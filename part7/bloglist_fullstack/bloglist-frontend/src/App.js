import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getBlogs } from './reducers/blogReducer' 

import blogService from './services/blogs'

import Alert from './components/Alert'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()

  const alerts = useSelector(state => state.alerts)

  // get blogs from backend
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)

  console.log(user, 'USER!')

  // check to see if useer is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    //setUser(null)
  }

  if(user === null) {
    return (
      <Login alerts={alerts} />
    )
  }

  return (
    <BlogList alerts={alerts} user={user} />
  )
  // return (
  //   <div>
  //     {(alerts.content) && alerts.content.map((alert, index) =>
  //       <Alert message={alert} type={alerts.type} key={index} />
  //     )}
  //     <h2>blogs</h2>
     
  //     {user.name} logged in <button onClick={handleLogout}>logout</button>
  //     <BlogForm />
      
  //     {blogs.map(blog =>
  //       <Blog
  //         key={blog.id}
  //         blog={blog}
  //         user={user}
  //       />
  //     )}
  //   </div>
  // )
}

export default App
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getBlogs } from './reducers/blogReducer' 
import { initializeUser } from './reducers/userReducer'

import blogService from './services/blogs'

import BlogList from './components/BlogList'
import Login from './components/Login'

const App = () => {
  const dispatch = useDispatch()

  const alerts = useSelector(state => state.alerts)

  // get blogs from backend
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)

  // check to see if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(initializeUser(user))
    }
  }, [])

  if(user === null) {
    return (
      <Login alerts={alerts} />
    )
  }

  return (
    <BlogList alerts={alerts} user={user} blogs={blogs} />
  )
}

export default App
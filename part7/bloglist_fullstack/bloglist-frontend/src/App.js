import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { getBlogs } from './reducers/blogReducer' 
import { initializeUser } from './reducers/loginReducer'

import blogService from './services/blogs'

import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import Header from './components/Header'

const App = () => {
  const dispatch = useDispatch()

  const alerts = useSelector(state => state.alerts)
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.login)
  
  // get blogs from backend
  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  // check to see if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(initializeUser(user))
    }
  }, [dispatch])

  return (
    <div>
      <Header alerts={alerts} user={loggedInUser} />
      <Router>
        <Switch>
          <Route path="/users">
            <Users loggedInUser={loggedInUser} />
          </Route>
          <Route path="/">
            {loggedInUser === null ?
              <Login alerts={alerts} /> :
              <BlogList user={loggedInUser} blogs={blogs} />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import { getBlogs } from './reducers/blogReducer' 
import { initializeUser } from './reducers/loginReducer'

import blogService from './services/blogs'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import Alerts from './components/Alerts'

const App = () => {
  const dispatch = useDispatch()

  const alerts = useSelector(state => state.alerts)
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.login)
  
  // get blogs from backend
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  // // check to see if user is logged in
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  //   if(loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     blogService.setToken(user.token)
  //     dispatch(initializeUser(user))
  //   }
  // }, [dispatch])

  // initialize user
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      <Router>
        <Navbar user={loggedInUser} />
        <Alerts alerts={alerts} />
        {loggedInUser && <h2>blog app</h2>}
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users loggedInUser={loggedInUser} />
          </Route>
          <Route path="/blogs/:id">
            <Blog loggedInUser={loggedInUser} blogs={blogs} />
          </Route>
          <Route path="/">
            {!loggedInUser ?
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
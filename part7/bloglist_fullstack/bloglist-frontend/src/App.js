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
  
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  // useEffect(() => {
  //   try {
  //     const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  //     const user = JSON.parse(loggedUserJSON)
  //     blogService.setToken(user.token)
  //     dispatch(initializeUser(user))
  //   } catch(e) {
  //     dispatch(initializeUser(null))
  //   }
  // }, [dispatch])

  // Check if user in localStorage

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(initializeUser(user))
    }
  }, [dispatch])

  if(!loggedInUser) {
    return (
      <div>
        <Alerts alerts={alerts} />
        <Login />
      </div>
    )
  } else {
    return (
      <Router>
        <Navbar user={loggedInUser} />
        <Alerts alerts={alerts} />
        <h2>blog app</h2>
  
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
            <BlogList user={loggedInUser} blogs={blogs} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
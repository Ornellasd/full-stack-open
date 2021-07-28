import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { getBlogs } from './reducers/blogReducer' 
import { initializeUser, logout } from './reducers/loginReducer'

import blogService from './services/blogs'
import usersService from './services/users'

import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import Alerts from './components/Alerts'

const App = () => {
  const dispatch = useDispatch()

  const alerts = useSelector(state => state.alerts)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  
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
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  console.log(user)
  return (
    <Router>
      <Switch>
        <Route path="/users">
          <div>
            <h2>blogs</h2>
            <Alerts alerts={alerts} />
            <Users />
          </div>
        </Route>
        <Route path="/">
          {user === null ?
            <Login alerts={alerts} /> :
            <div>
              <h2>blogs</h2>
              <Alerts alerts={alerts} />
              {user.name} logged in <button onClick={handleLogout}>logout</button>
              <BlogList user={user} blogs={blogs} />
            </div>
          }
        </Route>
      </Switch>

    </Router>
  )
}

export default App
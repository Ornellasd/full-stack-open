import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import {
  Container,
  CssBaseline
} from '@material-ui/core'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(initializeUser(user))
    }
  }, [dispatch])

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Router>
        {loggedInUser &&
          <div>
            <Navbar user={loggedInUser} />
            <Alerts alerts={alerts} />
          </div>
        }

        <Switch>
          <Route path="/users/:id">
            {loggedInUser ? <User /> : <Redirect to="/login" />}
          </Route>
          <Route path="/users">
            {loggedInUser ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path="/blogs/:id">
            {loggedInUser ? <Blog loggedInUser={loggedInUser} blogs={blogs} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/blogs">
            {loggedInUser ? <BlogList blogs={blogs} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            {loggedInUser ? <Redirect to="/blogs" /> : <Login alerts={alerts} />}
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App
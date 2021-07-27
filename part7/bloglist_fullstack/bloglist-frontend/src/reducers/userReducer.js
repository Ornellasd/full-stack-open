import loginService from '../services/login'
import blogService from '../services/blogs'

import { setAlerts } from './alertReducer'

const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

const initialState = loggedUserJSON ? loggedUserJSON : null

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        data: user
      })

    } catch(e) {
      dispatch(setAlerts(['Wrong username or password'], 'error', 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer

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
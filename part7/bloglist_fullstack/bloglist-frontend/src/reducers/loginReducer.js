import loginService from '../services/login'
import blogService from '../services/blogs'

import { setAlerts } from './alertReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
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
        type: 'SET_USER',
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

export const initializeUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export default userReducer
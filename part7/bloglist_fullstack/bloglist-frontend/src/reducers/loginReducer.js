import loginService from '../services/login'
import blogService from '../services/blogs'

import { setAlerts } from './alertReducer'

const loginReducer = (state = null, action) => {
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

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

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
    window.localStorage.removeItem('loggedBlogappUser')
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

export default loginReducer
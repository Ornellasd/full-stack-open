import loginService from '../services/login'
import blogService from '../services/blogs'

import { setAlerts } from './alertReducer'

//const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

//const initialState = loggedUserJSON ? loggedUserJSON : null

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    case 'INITIALIZE':
      console.log('FROM REDUCER!?!?!?!?')
      return action.data
      //return action.data
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

// export const initializeUser = (user) => {
//   return {
//     type: 'INITIALIZE',
//     data: user
//   }
// }
  // // check to see if user is logged in
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  //  
  // }, [dispatch])
export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  if(loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'INITIALIZE',
      data: user
    }
  } else {
    return {
      type: 'INITIALIZE',
      data: null
    }
  }
}


export default userReducer
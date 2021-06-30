let timeout

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  if(timeout) {
    clearTimeout(timeout)
  }
  
  return async dispatch => {
    console.log(timeout)
  
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    timeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer
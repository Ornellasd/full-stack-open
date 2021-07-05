let timeout

const alertReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_ALERTS':
      return action.data
    case 'CLEAR_ALERTS':
      return []
    default:
      return state
  }
}

export const setAlerts = (content, type, time) => {
  if(timeout) {
    clearTimeout(timeout)
  }
  
  return async dispatch => {
    dispatch({
      type: 'SET_ALERTS',
      data: {
        content,
        type
      }
    })
    timeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_ALERTS'
      })
    }, time * 1000)
  }
}

export default alertReducer
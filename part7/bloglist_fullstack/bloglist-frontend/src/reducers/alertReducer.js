let timeout

const alertReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_ALERTS':
      return action.data
    default:
      return state
  }
}

export const setAlerts = (content, type,) => {
  return {
    type: 'SET_ALERTS',
    data: { 
      content,
      type
    }
  }
}  




export default alertReducer
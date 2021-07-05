const alertReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_ALERTS':
      return [...state, action.data]
    default:
      return state
  }
}

export const setAlerts = (content) => {
  return {
    type: 'SET_ALERTS',
    data: { 
      content
    }
  }
}

export default alertReducer
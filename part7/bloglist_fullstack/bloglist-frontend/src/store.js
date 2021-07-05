import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import alertReducer from './reducers/alertReducer'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// })

const store = createStore(
  alertReducer,
  applyMiddleware(thunk)
)

export default store
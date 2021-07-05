import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import alertReducer from './reducers/alertReducer'

const reducer = combineReducers({
  alerts: alertReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import alertReducer from './reducers/alertReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  alerts: alertReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
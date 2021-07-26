import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import alertReducer from './reducers/alertReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  alerts: alertReducer,
  blogs: blogReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
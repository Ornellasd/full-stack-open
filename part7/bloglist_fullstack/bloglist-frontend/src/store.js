import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import alertReducer from './reducers/alertReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  alerts: alertReducer,
  blogs: blogReducer,
  login: loginReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
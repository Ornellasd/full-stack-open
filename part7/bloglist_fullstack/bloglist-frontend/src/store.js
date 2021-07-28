import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import alertReducer from './reducers/alertReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  alerts: alertReducer,
  blogs: blogReducer,
  login: loginReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
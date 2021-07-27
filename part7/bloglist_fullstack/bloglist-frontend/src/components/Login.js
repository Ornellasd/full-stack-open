import React from 'react'
import { useDispatch } from 'react-redux'

import Alerts from './Alerts'

import { login } from '../reducers/userReducer'

const Login = ({ alerts }) => {
  const dispatch = useDispatch()
  
  const handleSubmit = event => {
    event.preventDefault()

    const userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    dispatch(login(userCredentials))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Alerts alerts={alerts} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input 
            id="username"
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input 
            id="passsword"
            type="password"
            name="password"
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>

  )
}

export default Login
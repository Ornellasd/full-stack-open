import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  TextField,
  Button
} from '@material-ui/core'

import { login } from '../reducers/loginReducer'

const Login = ({ alerts }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const handleSubmit = event => {
    event.preventDefault()

    const userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    dispatch(login(userCredentials))
    history.push('/')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="username" name="username" />
        </div>
        <div>
          <TextField label="password" type="password" name="password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login
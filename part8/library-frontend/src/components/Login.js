import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../mutations'

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password }})
    setUsername('')
    setPassword('')
  }

  if(!show) {
    return null
  }
  
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input 
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
              setError('')
            }}
          />
        </div>
        <div>
          password
          <input 
            value={password}
            type="password"
            onChange={({ target }) => {
              setPassword(target.value)
              setError('')
            }}
          />
        </div>
        <button type="submit">login</button>
      </form>
      {error &&
        <h4 style={{ color: 'red' }}>{error}</h4>
      }
    </div>
  )
}

export default Login
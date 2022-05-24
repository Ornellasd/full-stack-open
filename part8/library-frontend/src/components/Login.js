import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

const Login = ({ show, setToken, setPage, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification({ text: error.graphQLErrors[0].message, type: 'danger' })
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
    <form onSubmit={submit}>
      <div>
        name
        <input 
          value={username}
          onChange={({ target }) => {
            setUsername(target.value)
            setNotification(null)
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
            setNotification(null)
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const Routes = ({ token, setToken, page, setPage, setError, showRecommendations }) => {
  return (
    <div>
      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        showRecommendations={showRecommendations}
      />

      <NewBook
        show={page === 'add'}
        setError={setError}
      />
      
      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setError={setError}
      />
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [error, setError] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const loggedInUserToken = window.localStorage.getItem('library-user-token')
    
    if(loggedInUserToken) {
      setToken(loggedInUserToken)
    }
  }, [])

  const showBooks = (showRecs) => {
    setPage('books')

    if(showRecs) {
      setShowRecommendations(true)
    } else {
      setShowRecommendations(false)
    }
  }

  return (
    <>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => showBooks()}>books</button>
        {token
          ? 
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => showBooks(true)}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Routes token={token} setToken={setToken} page={page} setPage={setPage} setError={setError} showRecommendations={showRecommendations} />

      {error &&
        <h4 style={{ color: 'red' }}>{error}</h4>
      }
    </>
  )
}

export default App
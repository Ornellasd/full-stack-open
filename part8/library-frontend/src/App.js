import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { BOOK_ADDED } from './components/subscriptions'
import { ALL_BOOKS } from './queries'

const Routes = ({ token, setToken, page, setPage, setError, showRecommendations, client }) => {
  return (
    <div>
      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        showRecommendations={showRecommendations}
        page={page}
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
        client={client}
      />
    </div>
  )
}

export const updateCache = (cache, query, addedBook) => {
  // add call to soon-to-be-created notify component here
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [error, setError] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS,
        variables: {
          genre: '',
        } 
      }, addedBook)
    }
  })

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
  }, [token])

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

      <Routes 
        token={token}
        setToken={setToken} 
        page={page} 
        setPage={setPage} 
        setError={setError} 
        showRecommendations={showRecommendations}
        client={client}
      />

      {error &&
        <h4 style={{ color: 'red' }}>{error}</h4>
      }
    </>
  )
}

export default App
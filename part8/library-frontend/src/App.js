import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { BOOK_ADDED } from './components/subscriptions'
import { ALL_BOOKS } from './queries'

const Routes = ({ token, setToken, page, setPage, setNotification, showRecommendations, client }) => {
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
        setNotification={setNotification}
      />
      
      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setNotification={setNotification}
        client={client}
      />
    </div>
  )
}

export const updateCache = (cache, query, addedBook) => {
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

const Notification = ({ message }) => {
  if(!message) return null
  return <h4 style={{ color: message.type === 'danger' ? 'red' : 'green' }}>{message.text}</h4>
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [showRecommendations, setShowRecommendations] = useState(false)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded

      setNotification({
        text: `"${addedBook.title}" by ${addedBook.author.name} was added`,
        type: 'success'
      })
      
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
    setPage('authors')
  }

  useEffect(() => {
    const loggedInUserToken = window.localStorage.getItem('library-user-token')
    
    if(loggedInUserToken) {
      setToken(loggedInUserToken)
    }
  }, [token])

  useEffect(() => {
    if(notification) {
      setTimeout(() => setNotification(null), 5000)
    }
  }, [notification])

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
        setNotification={setNotification} 
        showRecommendations={showRecommendations}
        client={client}
      />

      <Notification message={notification} />
    </>
  )
}

export default App
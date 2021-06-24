import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()
  
  const vote = (anecdote) => {
    dispatch(upvote(anecdote))
    dispatch(setNotification(`you voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
import React from 'react'
import { useSelector, connect } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  
  const vote = (anecdote) => {
    props.upvote(anecdote)
    props.setNotification(`you voted "${anecdote.content}"`, 5)
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

const mapDispatchToProps = {
  upvote,
  setNotification,
}

export default connect(
  null,
  { 
    setNotification,
    upvote
  }
)(AnecdoteList)
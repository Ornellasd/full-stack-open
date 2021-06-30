import React from 'react'
import { connect } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = (props) => {  
  const anecdotesToShow = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter))
  
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  setNotification,
  upvote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
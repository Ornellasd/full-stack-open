import React, { useState } from 'react'

const Button = ({ action, text }) => {
  return <button onClick={action}>{text}</button>
}

const DisplayVotes = (props) => {
  return <p>has {props.votes} votes</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selectedAnecdote, setSelectedAnecdote] = useState(0)

  const [allVotes, updateVotes] = useState(Array(anecdotes.length).fill(0))

  //const [anecdoteVote, setAnecdoteVote] = useState(0)

  const setToAnecdote = (newAnecdote) => {
    setSelectedAnecdote(newAnecdote)
  }

  const handleNewAnecdoteClick = () => {
    setToAnecdote(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    let newArr = [...allVotes]
    
    newArr[selectedAnecdote]++
    updateVotes(newArr)

    console.log(allVotes)
  }
  
  return (
    <div>
      <p>{anecdotes[selectedAnecdote]}</p>
      <DisplayVotes votes={allVotes[selectedAnecdote]}/>
      <Button action={handleNewAnecdoteClick} text="next anecdote" />
      <Button action={handleVoteClick} text="vote" />
    </div>
  )
}

export default App
import React, { useState } from 'react'

const Button = ({ action, text }) => {
  return <button onClick={action}>{text}</button>
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
   
  const [selected, setSelected] = useState(0)

  const setToAnecdote = (newAnecdote) => {
    setSelected(newAnecdote)
  }

  const handleButtonClick = () => {
    setToAnecdote(Math.floor(Math.random() * anecdotes.length))
  }
  
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button action={handleButtonClick} text="next anecdote" />
      <Button action={() => console.log('vote')} text="vote" />
    </div>
  )
}

export default App
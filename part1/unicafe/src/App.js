import React, { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Average = ({ text, votes }) => {
  const averageVotes = (votes) => {
    const goods = votes[0]
    const neutrals = 0 * votes[1]
    const bads = -1 * votes[2]
    const sum = goods + neutrals + bads
    
    return sum / 3
  }

  return (
      <p>{text} {averageVotes(votes)}</p>
  )
}

/*
const Postive = (props) => (

)
*/

const Statistics = ({ text, clicks }) => <p>{text} {clicks}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  } 

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Heading text="statistics" />
      <Statistics text="good" clicks={good} />
      <Statistics text="neutral" clicks={neutral} />
      <Statistics text="bad" clicks={bad} />
      <Average text="average" votes={[good, neutral, bad]} />
    </div>
  )
}

export default App
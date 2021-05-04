import React, { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

/*
const Postive = (props) => (

)
*/

const Statistics = ({ text, data }) => {
  const averageVotes = (data) => {
    const goods = data[0]
    const neutrals = 0 * data[1]
    const bads = -1 * data[2]
    const sum = goods + neutrals + bads

    return sum / 3
  }

  if(typeof(data) === 'number') {
    return (
      <p>{text} {data}</p>
    )
  }

  return (
    <p>{text} {averageVotes(data)}</p>
  )
  
}


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
      <Statistics text="good" data={good} />
      <Statistics text="neutral" data={neutral} />
      <Statistics text="bad" data={bad} />
      <Statistics text="all" data={good + neutral + bad} />
      <Statistics text="average" data={[good, neutral, bad]} />
    </div>
  )
}

export default App
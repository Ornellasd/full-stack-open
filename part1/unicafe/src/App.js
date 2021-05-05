import React, { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, data }) => {
  const total = data[0] + data[1] + data[2]
  const goods = data[0]
  const neutrals = 0 * data[1]
  const bads = -1 * data[2]

  const numOr0 = n => isNaN(n) ? 0 : n
  
  if(typeof(data) === 'number') {
    return <p>{text} {data}</p>
  } else if(total === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <p>average {numOr0((goods + neutrals + bads) / total)}</p>
        <p>positive {numOr0(goods / total * 100)} %</p>
      </div>
    )
  }  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

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
      <Statistic text="good" data={good} />
      <Statistic text="neutral" data={neutral} />
      <Statistic text="bad" data={bad} />
      <Statistic text="all" data={total} />
      <Statistic data={[good, neutral, bad]} />
    </div>
  )
}

export default App
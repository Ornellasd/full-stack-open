import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const excercises1 = 10
  const part2 = 'Using props to pass data'
  const excercises2 = 7
  const part3 = 'State of a component'
  const excercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {excercises1}
      </p>
      <p>
        {part2} {excercises2}
      </p>
      <p>
        {part3} {excercises3}
      </p>
      <p>Number of excercises {excercises1 + excercises2 + excercises3}</p>
    </div>
  )
}

export default App
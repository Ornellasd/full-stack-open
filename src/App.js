import React from 'react'

const Header = (props) => {
  return <h1>{props.course} </h1>
}

const Part = (props) => {
  return <p>
    {props.part} {props.excercise}
  </p>
}

const Total = (props) => {
  return <p>Number of excercises {props.total}</p>
} 
 
const Content = (props) => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Part part={part1} excercise={exercises1} />
      <Part part={part2} excercise={exercises2} />
      <Part part={part3} excercise={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course} />
      <Content />
    </div>
  )
}

export default App
import React from 'react'

const Header = (props) => {
  return <h1>{props.course} </h1>
}

const Total = (props) => {
  return <p>Number of excercises {props.total}</p>
} 
 
const Content = (props) => {
  console.log(props.parts);

  return (
    <div>
      <p>
        {props.parts[0].name} {props.parts[0].exercises}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exercises}
      </p>
    </div>
  )
} 

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
    </div>
  )
}
//      <Total total={exercises1 + exercises2 + exercises3} />

export default App
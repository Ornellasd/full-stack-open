import React from 'react'

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Total = ({ parts }) => {
  const total = parts.reduce(((acc, part) => acc + part.exercises), 0)

  return <b>total of {total} excercises</b>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <p>{part.name} {part.exercises}</p>
      )}
    </div>
  )
} 

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )    
}

export default Course
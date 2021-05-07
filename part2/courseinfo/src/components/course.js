import React from 'react'

const Header = ({ course }) => {
  return <h1>{course} </h1>
}

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  )
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
    </div>
  )    
}

export default Course
import React from 'react';
import { JsxEmit } from 'typescript';

const Header = ({ courseName }: { courseName: string }) => (
  <h1>{courseName}</h1>
);

interface CourseType {
  name: string;
  exerciseCount: number;
};

const Content = ({ courseParts }: { courseParts: CourseType[] }) => {
  return (
    <div>
      {courseParts.map(course =>
        <p>{course.name} {course.exerciseCount}</p>
      )}
    </div>
  )  
};

const Total = ({ courseParts }: { courseParts: CourseType[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
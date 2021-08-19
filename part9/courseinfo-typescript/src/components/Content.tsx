import { CoursePart } from "../types";

// const Part = ({ course }: { course: CoursePart }) => {
//   switch(course.type) {
//     case 'normal':
//       return (
//         <p>{course.name} {course.exerciseCount}</p>
//       );
//     case 'groupProject':
//       return (

//       )
//   }
// }


const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(course =>
        <div>
          <p>{course.name} {course.exerciseCount}</p>
          {/* <Part course={course} /> */}
        </div>
      )}
    </div>
  )  
};

export default Content;
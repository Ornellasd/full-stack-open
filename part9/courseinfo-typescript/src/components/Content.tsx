import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(course =>
        <p>{course.name} {course.exerciseCount}</p>
      )}
    </div>
  )  
};

export default Content;
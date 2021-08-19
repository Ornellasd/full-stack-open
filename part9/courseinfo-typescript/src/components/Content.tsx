import { CourseType } from "../types";

const Content = ({ courseParts }: { courseParts: CourseType[] }) => {
  return (
    <div>
      {courseParts.map(course =>
        <p>{course.name} {course.exerciseCount}</p>
      )}
    </div>
  )  
};

export default Content;
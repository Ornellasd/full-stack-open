import { CoursePart } from "../types"

const Part = ({ course }: { course: CoursePart }) => {
  switch(course.type) {
    case 'normal':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br />
          <em>{course.description}</em>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br />
          Project exercises {course.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br />
          <em>{course.description}</em>
          <br />
          submit to {course.exerciseSubmissionLink}
        </p>
      )
    case 'special':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br />
          <em>{course.description}</em>
          <br />
          required skills: {course.requirements.map((r, i) => i === course.requirements.length - 1 ? r : r + ', ')}
        </p>
      )
    default:
      return null
  }
};

export default Part;
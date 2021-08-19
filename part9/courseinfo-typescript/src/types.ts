interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartBase {
  type: 'special';
  requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;
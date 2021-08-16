interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hourArr: Array<number>, target: number): Result => {
  const average =  hourArr.reduce((sum, value) => {
      return sum + value;
    }, 0) / hourArr.length;

  const percentage = average / target;

  let rating: number;
  let ratingDescription: string;

  if(percentage >= 1) {
    rating = 3;
    ratingDescription = 'Perfect! Keep it up.';
  } else if(percentage > 0.7) {
    rating = 2;
    ratingDescription = 'Good job, but you can improve.';
  } else {
    rating = 1;
    ratingDescription = 'Try better next week...';
  }

  return {
    periodLength: hourArr.length,
    trainingDays: hourArr.filter(d => d !== 0).length,
    success: average < target ? false : true,
    rating,
    ratingDescription,
    target,
    average
  };
};

export { calculateExercises };
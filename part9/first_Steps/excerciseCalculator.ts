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

  const result = {
    periodLength: hourArr.length,
    trainingDays: hourArr.filter(d => d !== 0).length,
    success: average < target ? false : true,
    rating,
    ratingDescription,
    target,
    average
  };

  return result;
};

interface ExcerciseValues {
  hourArr: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): ExcerciseValues => {
  const hourArr = args.slice(3).map(Number);
  const target = Number(args[2]);

  if(args.length < 5) throw new Error('Not Enough arguments');

  if(!isNaN(target) && hourArr.every(element => !isNaN(element))) {
    return {
      hourArr,
      target
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { hourArr, target } = parseArguments(process.argv);
  console.log(calculateExercises(hourArr, target));
} catch(e) {
  const error = (e as Error).message;
  console.log('Error, something bad happened, message: ', error);
}

export { calculateExercises };
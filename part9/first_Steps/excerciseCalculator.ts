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
  }

  return result;
}

interface ExcerciseValues {
  hourArr: Array<string>;
  target: number;
}

// const parseArguments = (args: Array<string>) => {
//   if(args.length)
// }
// const parseArguments = (args: Array<string>): ExcerciseValues => {

// } 
console.log(process.argv.slice(3).map(Number).every(element => !isNaN(element)));

// console.log(process.argv.slice(3).map(Number).length);
// const target: number = Number(process.argv[2]);
// const hourArr: Array<number> = process.argv.slice(3).map(Number);

// calculateExercises(hourArr, target));
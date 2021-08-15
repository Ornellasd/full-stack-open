const calculateBmi = (height: number, weight: number): string => {
  const bmi: number =  weight / ((height / 100) ** 2);

  if(bmi < 18.5) {
    return 'Underweight';
  } else if(bmi >= 18.5 && bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if(bmi >= 25 && bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch(e) {
  console.log('Error, something bad happened, message: ', e.message);
}
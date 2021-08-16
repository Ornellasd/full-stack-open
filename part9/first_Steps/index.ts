import express from 'express';
import { calculateBmi } from './bmiCalculator';
// import { calculateExercises } from './excerciseCalculator';

const app = express();

app.use(express.json());

app.get('/bmi', (_req, res) => {
  const { height, weight } = _req.query;

  if((!height || !weight) || (isNaN(Number(height)) || isNaN(Number(weight)))) {
    throw new Error('malformatted parameters');
  } else {
    res.send({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight))
    });
  }
});

app.post('/exercise', (_req, res) => {
 console.log(_req.body.name);

 res.send('derp');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
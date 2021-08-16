import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
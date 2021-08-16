import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './excerciseCalculator';

const app = express();

app.use(express.json());

app.get('/bmi', (_req, res) => {
  const { height, weight } = _req.query;

  if(!height || !weight) res.status(400).json({ error: 'missing parameters' });
  if(isNaN(Number(height)) || isNaN(Number(weight))) res.status(400).json({ error: 'malformatted parameters' });

  res.send({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post('/exercise', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = _req.body;

  if(!daily_exercises || !target) res.status(400).json({ error: 'missing parameters' });
  if(!Array.isArray(daily_exercises) || isNaN(target)) res.status(400).json({ error: 'malformatted parameters' });

  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
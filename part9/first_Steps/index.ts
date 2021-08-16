import express from 'express';
const app = express();

app.get('/bmi', (_req, res) => {
  const { height, weight } = _req.query;

  if((!height || !weight) || (isNaN(Number(height)) || isNaN(Number(weight)))) {
    throw new Error('malformatted parameters');
  } else {
    res.send('hieperdepiep!');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get('/nonlatin', (_req, res) => {
  res.send(diagnosesService.getNonLatinDiagnoses());
});

export default router;
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatients().filter(p => p.id == req.params.id);
  res.send(patient[0]);
});

router.post('/:id/entries', (req, res) => {
  const patient = req.params.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newVisit = req.body;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  patientService.addVisit(newVisit, patient);
  res.json(newVisit);
});

export default router;
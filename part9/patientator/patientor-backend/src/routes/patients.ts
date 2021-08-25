import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewVisitEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatients().filter(p => p.id == req.params.id);
  res.send(patient[0]);
});

router.post('/:id/entries', (req, res) => {
  const patient = req.params.id;
  try {
    const newVisitEntry = toNewVisitEntry(req.body);
    const addedVisitEntry = patientService.addVisit(newVisitEntry, patient);
    res.json(addedVisitEntry);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

export default router;
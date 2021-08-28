/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v1 as uuid} from 'uuid';
import patients from '../../data/patientEntries';

import {
  // BaseEntry,
  NewPatientEntry, 
  PatientEntry, 
  NoSSN, 
} from '../types';

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitivePatients = (): NoSSN [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( patient: NewPatientEntry ): PatientEntry => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  
  patients.push(newPatient);
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addVisit = ( entry: any, patientId: string ) => {
  const patient = patients.find(patient => patient.id === patientId);

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient?.entries?.push(newEntry);

  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addVisit
};
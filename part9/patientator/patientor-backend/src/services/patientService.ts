/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v1 as uuid} from 'uuid';
import patients from '../../data/patientEntries';

import {
  NewPatient, 
  Patients, 
  NoSSN 
} from '../types';

const getPatients = (): Array<Patients> => {
  return patients;
};

const getNonSensitivePatients = (): NoSSN [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patients => {
  const newPatient = {
    /* eslint-disable @typescript-eslint/no-unsafe-call; */
    id: uuid(),
    ...patient
  };
  
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v1 as uuid} from 'uuid';
import patients from '../../data/patientEntries';

import {
  // BaseEntry,
  NewPatientEntry, 
  PatientEntry, 
  NoSSN 
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
    ...patient
  };
  
  patients.push(newPatient);
  return newPatient;
};

const addVisit = ( entry: any, patientId: string ) => {
  console.log(entry);

  const patient = patients.find(p => p.id === patientId);

  const updatedPatient = {
    ...patient,
    entries: patient?.entries?.concat(entry)
  };


  return updatedPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addVisit
};
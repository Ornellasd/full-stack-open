import patients from '../../data/patientEntries';

import { Patients, NoSSN } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients
};
import { Gender, Patients } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseId = (id: unknown): string => {
  if(!id || !isString(id)) {
    throw new Error('Incorrect or missing id: ' + id);
  }
  return id;
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if(!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const toNewPatientEntry = (object: unknown): Patients => {
  const newPatient: Patients = {

  };
  return newPatient;
};

export default toNewPatientEntry;
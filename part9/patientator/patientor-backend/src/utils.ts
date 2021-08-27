import {
  Gender,
  NewPatientEntry,
  NewVisitEntry, 
  DiagnosesEntry, 
  Discharge,
  Entry,
  HealthCheckRating,
  SickLeave,
  VisitEntryType
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };

  return newPatient;
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)) {
    throw new Error('Incorrect or missing occupation: ' + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: DiagnosesEntry['code']): DiagnosesEntry['code'][] => {
  if(!Array.isArray(codes) || !codes.every(code => isString(code))) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  return codes;
};

const parseType = (type: VisitEntryType): VisitEntryType => {
  if(!isString(type) || !Object.values(VisitEntryType).includes(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newBaseVisitEntry = (object: any): NewVisitEntry => {
  const newBaseVisit: NewVisitEntry = {
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };

  if(object.diagnosisCodes) {
    newBaseVisit.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }
  
  return newBaseVisit;
};

const parseDischarge = (discharge: Discharge): Discharge => {
  if(!isString(discharge.date) || !isString(discharge.criteria) || !discharge.date || !discharge.criteria) {
    throw new Error('Incorrect or missing discharge fields');
  }
  return discharge; 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(!isHealthCheckRating(rating) || rating === null) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }

  return rating;
};

const parseSickLeave = (sickLeave: SickLeave): SickLeave => {
  if(!isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
    throw new Error('Incorrect or missing sick leave data');
  }

  return sickLeave;
};

export const toNewVisitEntry = (object: Entry) => {
  const baseVisitEntry: NewVisitEntry = newBaseVisitEntry(object);

  switch(object.type) {
    case 'Hospital':
      return {
        ...baseVisitEntry,
        discharge: parseDischarge(object.discharge)
      };
    case 'HealthCheck':
      return {
        ...baseVisitEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      const ohEntry = {
        ...baseVisitEntry,
        employerName: object.employerName,
      };

      if(object.sickLeave) {
        return {
          ...ohEntry,
          sickLeave: parseSickLeave(object.sickLeave)
        };
      }
      
      return ohEntry;
    default:
      return baseVisitEntry;
  }
};
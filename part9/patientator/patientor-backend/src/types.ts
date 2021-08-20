export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Entry {

}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries?: Entry[];
}

export type NoSSN = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
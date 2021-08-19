export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NoSSN = Omit<Patients, 'ssn'>;
export type NewPatient = Omit<Patients, 'id'>;
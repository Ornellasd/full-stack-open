export interface Diagnoses {
  code: string;
  name: string;
  latin?: string
}

export type NoLatinDiagnoses = Omit<Diagnoses, 'latin'>;

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
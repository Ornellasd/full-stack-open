export interface Diagnoses {
  code: string;
  name: string;
  latin?: string
}

export type NoLatinDiagnoses = Omit<Diagnoses, 'latin'>;
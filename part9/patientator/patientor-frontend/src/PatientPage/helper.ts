import { Diagnosis } from '../types';

export const filteredDiagnosisName = (code: string, diagnoses: Diagnosis[]): string => {
  return Object.values(diagnoses).filter((diagnosis: Diagnosis) => diagnosis.code === code )[0].name + ' ';
};

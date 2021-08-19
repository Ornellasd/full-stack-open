import diagnoses from '../../data/diagnosesEntries';

import { DiagnosesEntry } from '../types';

const getDiagnoses = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

export default {
  getDiagnoses
};
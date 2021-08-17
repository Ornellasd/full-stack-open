import diagnoses from '../../data/diagnosesEntries';

import { Diagnoses } from '../types';

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnoses;
};

export default {
  getDiagnoses
};
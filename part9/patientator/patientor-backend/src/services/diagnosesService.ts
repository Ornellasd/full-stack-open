import diagnoses from '../../data/diagnoses';

import { Diagnoses, NoLatinDiagnoses } from '../types';

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnoses;
};

const getNonLatinDiagnoses = (): NoLatinDiagnoses [] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name
  }));
};

export default {
  getDiagnoses,
  getNonLatinDiagnoses
};
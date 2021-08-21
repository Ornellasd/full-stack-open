import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { Icon } from "semantic-ui-react";

import { filteredDiagnosisName } from './helper';

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="hospital" /></h2>
      {entry.diagnosisCodes?.map((code, index) =>
        <em key={index} style={{ color: 'grey' }}>{filteredDiagnosisName(code, diagnoses)}</em>
        )}
    </div>
  );
};

export default HospitalEntry;
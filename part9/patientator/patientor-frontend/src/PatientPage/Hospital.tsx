import React from 'react';
// import { useStateValue } from '../state';
import { HospitalEntry } from '../types';
import { Icon } from "semantic-ui-react";

// import { filteredDiagnosisName } from './helper';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  // const [{ diagnoses }] = useStateValue();
  console.log(entry.discharge);
  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="hospital" /></h2>
      <em style={{ color: 'grey' }}>{entry.description}</em>
      {/* {entry.diagnosisCodes?.map((code, index) =>
        <em key={index} style={{ color: 'grey' }}>{filteredDiagnosisName(code, diagnoses)}</em>
      )} */}
    </div>
  );
};

export default Hospital;
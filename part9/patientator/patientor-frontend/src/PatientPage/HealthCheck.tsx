import React from 'react';
// import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';
import { Icon } from "semantic-ui-react";

// import { filteredDiagnosisName } from './helper';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  // const [{ diagnoses }] = useStateValue();
  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="stethoscope" /></h2>
      <em style={{ color: 'grey' }}>{entry.description}</em>
      {/* {entry.diagnosisCodes?.map((code, index) =>
        <em key={index} style={{ color: 'grey' }}>{filteredDiagnosisName(code, diagnoses)}</em>
        )} */}
      
    </div>
  );
};

export default HealthCheck;
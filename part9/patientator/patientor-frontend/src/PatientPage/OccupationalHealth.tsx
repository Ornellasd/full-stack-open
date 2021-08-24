import React from 'react';
import { useStateValue } from '../state';
import { OccupationalHealthCareEntry } from '../types';
import { Icon } from "semantic-ui-react";

import { filteredDiagnosisName } from './helper';

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="building" /></h2>
      <em style={{ color: 'grey' }}>{entry.description}</em>
      <h4>Diagnoses:</h4>
      <div className="ui bulleted list">
        {entry.diagnosisCodes?.map(code =>
          <div key={code} className="item">
            {filteredDiagnosisName(code, diagnoses)}
          </div>
        )}
      </div>
      <strong>Sick leave:</strong> {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
    </div>
  );
};

export default OccupationalHealthcare;
import React from 'react';
import { Diagnosis, HospitalEntry } from '../types';
import { Icon } from "semantic-ui-react";

import { filteredDiagnosisName } from './helper';

const Hospital = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[] }) => {
  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="hospital" /></h2>
      <em style={{ color: 'grey' }}>{entry.description}</em>
      <h4>Diagnoses:</h4>
      <div className="ui bulleted list">
        {Object.keys(diagnoses).length > 0 && entry.diagnosisCodes?.map(code =>
          <div key={code} className="item">
            {filteredDiagnosisName(code, diagnoses)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospital;
import React from 'react';
import { Diagnosis, HospitalEntry } from '../types';
import { Icon } from 'semantic-ui-react';

import { filteredDiagnosisName } from './helper';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[]
}

const Hospital = ({ entry, diagnoses }: Props) => {
  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="hospital" /></h2>
      <em style={{ color: 'grey' }}>{entry.description}</em>

      {(entry.diagnosisCodes && entry.diagnosisCodes.length > 0)  &&
        <div style={{ paddingTop: '10px' }}>
          <strong>Diagnoses:</strong>
          <div className="ui bulleted list">
            {Object.keys(diagnoses).length > 0 && entry.diagnosisCodes.map(code =>
              <div key={code} className="item">
                {filteredDiagnosisName(code, diagnoses)}
              </div>
            )}
          </div>
        </div>
      }

      <div style={{ paddingTop: '10px' }}>
        <div>
          <strong>Discharge Date:</strong>
          <span> {entry.discharge.date}</span>
        </div>
        <div>
          <strong>Discharge Criteria:</strong>
          <span> {entry.discharge.criteria}</span>
        </div>
        </div>
      </div>
     
  );
};

export default Hospital;
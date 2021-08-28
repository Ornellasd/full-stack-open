import React from 'react';
import { Diagnosis, OccupationalHealthCareEntry } from '../types';
import { Icon } from 'semantic-ui-react';

import { filteredDiagnosisName } from './helper';

interface Props {
  entry: OccupationalHealthCareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcare = ({ entry, diagnoses }: Props) => {
  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="building" /></h2>
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
    
      {entry.sickLeave?.startDate  &&
        <div style={{ paddingTop: '10px' }}>
          <strong>
            Sick leave:
          </strong>
          <span> {entry.sickLeave?.startDate} to {entry.sickLeave.endDate}</span>
        </div>
      }
    </div>
  );
};

export default OccupationalHealthcare;
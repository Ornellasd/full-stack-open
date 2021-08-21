/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useStateValue } from '../state';
import { Entry, Diagnosis } from '../types';
import { Icon, SemanticICONS } from "semantic-ui-react";

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const filteredDiagnosisName = (code: string): string => {
    return Object.values(diagnoses).filter((diagnosis: Diagnosis) => diagnosis.code === code )[0].name;
  };

  console.log(entry);

  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="hospital" /></h2>
      {entry.diagnosisCodes?.map((code, index) =>
        <em key={index} style={{ color: 'grey' }}>{filteredDiagnosisName(code)}</em>
      )}
    </div>
  );
};

export default HospitalEntry;
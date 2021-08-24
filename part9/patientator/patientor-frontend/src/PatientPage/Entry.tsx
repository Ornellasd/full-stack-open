import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';

import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealth';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  switch(entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
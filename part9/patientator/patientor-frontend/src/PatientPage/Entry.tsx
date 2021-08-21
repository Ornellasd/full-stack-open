import React from 'react';
import { Entry } from '../types';

import HospitalEntry from './HospitalEntry';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch(entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <p>Occupational Derp</p>;
    case 'HealthCheck':
      return <p>health check check</p>;
    default:
      return null;
  }
};

export default EntryDetails;
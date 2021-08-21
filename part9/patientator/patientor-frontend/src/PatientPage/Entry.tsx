import React from 'react';
import { Entry } from '../types';

import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthCareEntry';
import HealthCheckEntry from './HealthCheckEntry';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch(entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
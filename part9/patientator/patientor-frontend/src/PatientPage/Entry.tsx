import React from 'react';
import { Entry } from '../types';

import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealth';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch(entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
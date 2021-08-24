import React from 'react';
import { HealthCheckEntry } from '../types';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const healthCheckRatingIcon = (): SemanticCOLORS => {
    switch(entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      default:
        return 'red';      
    }
  };
  
  return (
    <div key={entry.id} className="ui segment">
      <h2>{entry.date} <Icon name="stethoscope" /></h2>
      <em style={{ color: 'grey' }}>{entry.description}</em>
      <p style={{ paddingTop: '5px' }}>
        <Icon name="heart" color={healthCheckRatingIcon()} />
      </p>
    </div>
  );
};

export default HealthCheck;
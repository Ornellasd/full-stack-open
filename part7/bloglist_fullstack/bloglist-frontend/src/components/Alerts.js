import React from 'react'

import { Alert } from '@material-ui/lab'

const Alerts = ({ alerts }) => {
  if(!alerts.content) {
    return null
  }

  return (
    <div>
      {alerts.content.map((alert, index) =>
        <Alert
          severity={alerts.type === 'success' ? 'success' : 'error'}
          key={index}
        >
          {alert}
        </Alert>
      )}
    </div>
  )
}

export default Alerts